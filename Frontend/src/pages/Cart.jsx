import { useEffect, useState } from "react";
import HeaderNavbar from "../components/Header_navbar";
import Footer from "../components/Footer";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userRes = await fetch(`http://localhost:5500/api/v1/auth/me`, {
          headers: { Authorization: token },
        });

        const userData = await userRes.json();
        if (!userData._id) throw new Error("User not found");

        const cartRes = await fetch(`http://localhost:5500/api/v1/cart/${userData._id}`);
        const cartData = await cartRes.json();
        setCart(cartData.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchCart();
  }, [token]);

  const placeOrder = async () => {
    try {
      const userRes = await fetch("http://localhost:5500/api/v1/auth/me", {
        headers: { Authorization: token },
      });

      const userData = await userRes.json();
      if (!userData._id) throw new Error("User not found");

      const res = await fetch(`http://localhost:5500/api/v1/orders/${userData._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userData._id, items: cart }),
      });
      if (!res.ok) throw new Error("Failed to place order");

      // Clear cart after successful order placement
      await fetch(`http://localhost:5500/api/v1/cart/${userData._id}`, {
        method: "DELETE",
      });

      setCart([]); // Clear local state
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );

  return (
    <>
      <HeaderNavbar />
      <div className="p-4">
        <h1 className="text-xl font-bold">Your Cart</h1>
        {cart.length > 0 ? (
          <>
            <ul>
              {cart.map((item) => (
                <li key={item.productId} className="border p-2 my-2">
                  {item.name} - ₹{item.price} (x{item.quantity})
                </li>
              ))}
            </ul>
            <button
              onClick={placeOrder}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Place Order
            </button>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
