import express from "express";
import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import {getAllOrders} from "../controllers/orderConroller.js"
const router = express.Router();

// Place an order from cart
router.post("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart || cart.items.length === 0) return res.status(400).json({ error: "Cart is empty" });

    const newOrder = new Order({
      userId: cart.userId,
      items: cart.items,
    });

    await newOrder.save();
    await Cart.findOneAndDelete({ userId: req.params.userId }); // Clear cart after order

    res.json(newOrder);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/all", getAllOrders);
// Get all orders for a user
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/:orderId", async (req, res) => {
    try {
      const { status } = req.body;
      const { orderId } = req.params;
  
      const order = await Order.findById(orderId);
      if (!order) return res.status(404).json({ message: "Order not found" });
  
      order.status = status;
      await order.save();
  
      res.json({ message: "Order status updated", order });
    } catch (error) {
      res.status(500).json({ message: "Error updating order status" });
    }
  });
export default router;
