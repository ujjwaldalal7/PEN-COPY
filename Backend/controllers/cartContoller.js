import Cart from "../models/cartModel.js";

// Get user cart
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    res.json(cart || { userId, items: [] });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, name, price } = req.body;
    if (!userId || !productId || !name || !price)
      return res.status(400).json({ message: "Missing required fields" });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, name, price, quantity: 1 }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId, name, price, quantity: 1 });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// Clear the cart
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    await Cart.updateOne({ userId }, { $set: { items: [] } });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart" });
  }
};
