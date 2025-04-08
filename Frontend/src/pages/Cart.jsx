import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderNavbar from "../components/Header_navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast"
import { api_url } from "../context/config";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // For navigation after order placement

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userRes = await fetch(`${api_url}/api/v1/auth/me`, {
          headers: { Authorization: token },
        });

        const userData = await userRes.json();
        if (!userData._id) throw new Error("User not found");

        const cartRes = await fetch(`${api_url}/api/v1/cart/${userData._id}`, {
          headers: { Authorization: token },
        });

        if (!cartRes.ok) throw new Error("Failed to load cart");

        const cartData = await cartRes.json();
        console.log("Fetched Cart Data:", cartData); // Debugging
        setCart(cartData.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Failed to load cart. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchCart();
  }, [token]);

  const placeOrder = async () => {
    try {
      const userRes = await fetch(`${api_url}/api/v1/auth/me`, {
        headers: { Authorization: token },
      });

      const userData = await userRes.json();
      if (!userData._id) throw new Error("User not found");

      const res = await fetch(`${api_url}/api/v1/orders/${userData._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ userId: userData._id, items: cart }),
      });
      if (!res.ok) throw new Error("Failed to place order");

      const orderData = await res.json();
      if (!orderData.orderId) throw new Error("Order ID missing from response");

      console.log("Order placed successfully! Order ID:", orderData._id);

      // Clear cart after successful order
      await fetch(`${api_url}/api/v1/cart/${userData._id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });

      setCart([]);
      toast.success("Order placed successfully!");

      navigate(`/order-confirmation/${orderData.orderId}`);

    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };
  const clearCart = async () => {
    try {
      const userRes = await fetch(`${api_url}/api/v1/auth/me`, {
        headers: { Authorization: token },
      });

      const userData = await userRes.json();
      if (!userData._id) throw new Error("User not found");
      await fetch(`api_url/api/v1/cart/${userData._id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });

      setCart([]);
      toast.success("Cart cleared");

    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
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
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : cart.length > 0 ? (
          <>
            <ul>
              {cart.map((item, index) => (
                <li key={item.productId || index} className="border p-2 my-2">
                  {item.name} - ₹{item.price} (x{item.quantity})
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center w-full gap-4">
              <button
                onClick={placeOrder}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Place Order
              </button>
              <button
                onClick={clearCart}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Clear Cart
              </button>
            </div>

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
