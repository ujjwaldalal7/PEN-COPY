import express from "express";
import { placeOrder, getUserOrders, getAllOrders, updateOrderStatus, getOrderById } from "../controllers/orderController.js"; // Ensure correct spelling

const router = express.Router();

// Place an order (This will call the controller function that reduces stock)
router.post("/:userId", placeOrder);

// Get all orders for admin
router.get("/all", getAllOrders);

// Get orders for a specific user
router.get("/:userId", getUserOrders);

// Update order status
router.put("/:orderId", updateOrderStatus);
router.get("/order/:orderId", getOrderById);

export default router;
