import { useEffect, useState } from "react";
import HeaderNavbar from "../../components/Header_navbar";
import Footer from "../../components/Footer";
const manageOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5500/api/v1/orders/all");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await fetch(`http://localhost:5500/api/v1/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
    <HeaderNavbar/>
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 shadow-lg rounded-lg border border-gray-200"
            >
              <p className="text-lg font-semibold text-gray-800">
                Order ID: <span className="text-gray-600">{order._id}</span>
              </p>
              <p className="text-lg text-gray-700 mt-2">
                Status:{" "}
                <span className="font-medium text-blue-600">{order.status}</span>
              </p>

              <div className="mt-4">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Ordered">Ordered</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default manageOrders;
