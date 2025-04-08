import express from "express";
import {getCart, addToCart, clearCart} from "../controllers/cartContoller.js";

const router = express.Router();

router.get("/:userId", getCart);      
router.post("/", addToCart);          
router.delete("/:userId", clearCart); 

export default router;
