import express from "express";
import Cart from "../models/cartModel.js";

const router = express.Router();

// Add item to cart
router.post("/", async (req, res) => {
  try {
    const { userId, productId, name, price } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ productId, name, price, quantity: 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user's cart
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) return res.json({ items: [] });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Clear cart after placing an order
router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    await Cart.updateOne({ userId }, { $set: { items: [] } }); // Clears only items, not entire cart
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
