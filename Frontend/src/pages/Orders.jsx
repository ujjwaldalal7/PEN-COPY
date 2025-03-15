import { useEffect, useState } from "react";
import HeaderNavbar from "../components/Header_navbar";
import Footer from "../components/Footer";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userRes = await fetch("http://localhost:5500/api/v1/auth/me", {
          headers: { Authorization: token },
        });
        const userData = await userRes.json();
        if (!userData._id) throw new Error("User not found");

        const ordersRes = await fetch(`http://localhost:5500/api/v1/orders/${userData._id}`);
        const ordersData = await ordersRes.json();
        setOrders(ordersData || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  return (
    <>
      <HeaderNavbar />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders placed yet.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order._id} className="border p-4 rounded-md shadow-md">
                <p className="font-semibold">Order ID: {order._id}</p>
                <p className="text-gray-600">Status: <span className="font-bold">{order.status}</span></p>
                <p className="text-gray-600">Total Items: {order.items.length}</p>
                <p className="text-gray-600">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Orders;
