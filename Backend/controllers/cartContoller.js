import Cart from "../models/cartModel.js";

// Get user cart
export const getCart = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    res.json(cart || { userId, items: [] }); // Return empty cart if not found
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    if (!userId || !productId || !quantity)
      return res.status(400).json({ message: "Missing required fields" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const { userId, quantity } = req.body;
    const { itemId } = req.params;

    if (!userId || !itemId || quantity < 1)
      return res.status(400).json({ message: "Invalid request" });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(item => item._id.toString() === itemId);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart item" });
  }
};

// Remove an item from cart
export const removeCartItem = async (req, res) => {
  try {
    const { userId } = req.body;
    const { itemId } = req.params;

    if (!userId || !itemId) return res.status(400).json({ message: "Invalid request" });

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error removing item" });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "User ID required" });

    await Cart.findOneAndDelete({ userId });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart" });
  }
};
