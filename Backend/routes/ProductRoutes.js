import express from "express";
import { createProduct, getProducts, deleteProduct} from "../controllers/ProductController.js";
import { getProductById } from "../controllers/ProductpageController.js";
import { adminAuth } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

router.post("/create", createProduct);
router.get("/", getProducts); 
router.get("/:id", getProductById); 
router.delete("/delete/:id",adminAuth, deleteProduct);

export default router;
