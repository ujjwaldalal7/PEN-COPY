import express from "express";
import { createProduct, getProducts, deleteProduct } from "../controllers/ProductController.js";
import { adminAuth } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getProducts); 
router.delete("/:id", adminAuth, deleteProduct);

export default router;
