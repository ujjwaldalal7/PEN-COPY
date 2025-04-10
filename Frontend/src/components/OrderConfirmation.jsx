import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api_url } from "../context/config";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId || orderId === "undefined") {
      setError("Invalid order ID.");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        console.log("Fetching order details for orderId:", orderId);

        const response = await fetch(`${api_url}/v1/orders/order/${orderId}`, {
          headers: {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch order. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Order data received:", data);

        setOrder(data);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Failed to load order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        console.log("Fetching user details...");

        const response = await fetch(`${api_url}/api/v1/auth/me`, {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        console.log("User data received:", data);

        setUser(data);
      } catch (err) {
        console.error("Error fetching user details:", err);
      }
    };

    fetchOrder();
    fetchUser();
  }, [orderId]);

  if (loading) return <p className="text-center text-gray-600">Loading order details...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!order) return <p className="text-center text-gray-600">Order not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Order Confirmation</h2>

      {/* User Details */}
      <p className="text-gray-700"><strong>Name:</strong> {user?.name || "N/A"}</p>
      <p className="text-gray-700"><strong>Phone:</strong> {user?.phone || "N/A"}</p>
      <p className="text-gray-700"><strong>Address:</strong> {user?.address || "N/A"}</p>

      {/* Order Details */}
      <p className="text-gray-700"><strong>Order ID:</strong> {order._id || "N/A"}</p>
      <p className="text-gray-700"><strong>Status:</strong> {order.status || "Unknown"}</p>

      <h3 className="text-lg font-semibold mt-4">Order Summary</h3>
      <table className="w-full mt-2 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Product</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <tr key={index} className="border">
                <td className="border p-2">{item?.name || "Unnamed Product"}</td>
                <td className="border p-2">{item?.quantity || 1}</td>
                <td className="border p-2">₹{(item?.price || 0).toFixed(2)}</td>
                <td className="border p-2">₹{((item?.price || 0) * (item?.quantity || 1)).toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-4">No items in this order.</td>
            </tr>
          )}
        </tbody>
      </table>

      <p className="mt-4 text-lg font-bold">
        Total Amount: ₹{order.totalAmount?.toFixed(2) || "0.00"}
      </p>

      <p className="mt-4 text-green-600 font-semibold">Thank you for shopping with us!</p>

      {/* Demo Site Disclaimer */}
      <p className="mt-6 text-sm text-gray-500 text-center">
        This site is made for demo purposes only. All orders placed here are not real and no actual transactions occur.
      </p>
    </div>
  );
};

export default OrderConfirmation;
