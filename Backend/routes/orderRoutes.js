import express from "express";
import { placeOrder, getUserOrders, getAllOrders, updateOrderStatus, getOrderById } from "../controllers/orderController.js";

const router = express.Router();

router.post("/:userId", placeOrder);
router.get("/all", getAllOrders);
router.get("/:userId", getUserOrders);
router.put("/:orderId", updateOrderStatus);
router.get("/order/:orderId", getOrderById);

export default router;
