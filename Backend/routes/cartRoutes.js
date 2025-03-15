import express from "express";
import Cart from "../models/cartModel.js";

const router = express.Router();

// Get user's cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add item to cart
router.post("/add", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Remove item from cart
router.delete("/remove/:userId/:productId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.productId.toString() !== req.params.productId);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
