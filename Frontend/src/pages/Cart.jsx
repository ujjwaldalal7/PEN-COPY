import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderNavbar from "../components/Header_navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast"

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // For navigation after order placement

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userRes = await fetch("http://localhost:5500/api/v1/auth/me", {
          headers: { Authorization: token },
        });

        const userData = await userRes.json();
        if (!userData._id) throw new Error("User not found");

        const cartRes = await fetch(`http://localhost:5500/api/v1/cart/${userData._id}`, {
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
      const userRes = await fetch("http://localhost:5500/api/v1/auth/me", {
        headers: { Authorization: token },
      });
  
      const userData = await userRes.json();
      if (!userData._id) throw new Error("User not found");
      
      const res = await fetch(`http://localhost:5500/api/v1/orders/${userData._id}`, {
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
      await fetch(`http://localhost:5500/api/v1/cart/${userData._id}`, {
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
