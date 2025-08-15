import React from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import HeaderNavbar from "../../components/Header_navbar";
import Footer from "../../components/Footer";

const Dashboard = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  // Redirect non-admin users
  if (!isAdmin) {
    navigate("/unauthorized");
    return null;
  }

  return (
    <>
      <HeaderNavbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h2>

        {/* Buttons Section */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => navigate("/admin/products/create")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition w-full md:w-auto"
          >
            ➕ Add Product
          </button>

          <button
            onClick={() => navigate("/admin/products")}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition w-full md:w-auto"
          >
            🛍️ Manage Products
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
