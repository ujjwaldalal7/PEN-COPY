import express from "express";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

const router = express.Router();

// Place an order (checkout)
router.post("/place-order", async (req, res) => {
  const { userId } = req.body;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

    const newOrder = new Order({
      userId,
      items: cart.items,
      totalAmount,
    });

    await newOrder.save();
    await Cart.findOneAndDelete({ userId });

    res.json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's orders
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all orders (Admin)
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update order status (Admin)
router.put("/update/:orderId", async (req, res) => {
  const { status } = req.body;

  if (!["Ordered", "In Transit", "Out for Delivery", "Delivered"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const order = await Order.findByIdAndUpdate(req.params.orderId, { status }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
