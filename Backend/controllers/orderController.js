import mongoose from "mongoose";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const placeOrder = async (req, res) => {
  const session = await mongoose.startSession(); // Start transaction
  session.startTransaction();
  try { 
    const { userId, items } = req.body;
    console.log("Received Order Request:", { userId, items });
    console.log("hi")
    // Check stock availability
    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);

      if (!product) {
        console.log(`Product not found: ${item.productId}`);
        await session.abortTransaction();
        return res.status(400).json({ error: `Product not found: ${item.name}` });
      }

      if (product.stock < item.quantity) {
        console.log(`Insufficient stock for: ${product.name}`);
        await session.abortTransaction();
        return res.status(400).json({ error: `Insufficient stock for ${product.name}` });
      }
    }
    
    // Reduce product stock
    await Promise.all(
      items.map(async (item) => {
        const updatedProduct = await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: -item.quantity } },
          { new: true, session } // Ensure the update is within the transaction
        );

        if (!updatedProduct) {
          console.log(`Failed to update stock for: ${item.productId}`);
          await session.abortTransaction();
          return res.status(500).json({ error: `Failed to update stock for ${item.name}` });
        }

        console.log(`Updated stock for ${updatedProduct.name}: New Stock = ${updatedProduct.stock}`);
      })
    );

    // Create the order
    const order = new Order({
      userId,
      items,
      status: "Ordered",
    });

    await order.save({ session });

    // Clear user's cart
    await Cart.findOneAndDelete({ userId }).session(session);

    await session.commitTransaction();
    session.endSession();

    console.log("Order placed successfully!");
    res.status(201).json({ message: "Order placed successfully!", order, 
      orderId: order._id  });

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Error placing order", error });
  }
};


// Get user's orders
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.params.userId; // Use req.params instead of req.query
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};


// Get all orders (Admin feature handled on frontend)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all orders" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { orderId } = req.params;

    if (!status) return res.status(400).json({ message: "Status is required" });

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status" });
  }
};
export const getOrderById = async (req, res) => {
  try {
      const order = await Order.findById(req.params.orderId);

      if (!order) {
          return res.status(404).json({ message: "Order not found" });
      }

      // Calculate total amount
      const totalAmount = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

      res.json({ ...order.toObject(), totalAmount });  // Include totalAmount in response
  } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Server error" });
  }
};
