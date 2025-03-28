import React from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUser, FaEnvelope, FaPhone, FaHome } from "react-icons/fa";
import HeaderNavbar from "../components/Header_navbar";
import Footer from "../components/Footer";

const UserDashboard = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    toast.error("Please log in first.");
    navigate("/login");
    return null;
  }

  return (
    <>
      <HeaderNavbar />
      <div className="flex flex-col min-h-screen bg-gray-50">
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">User Dashboard</h2>
            <div className="space-y-6 text-lg text-gray-700">
              <p className="flex items-center space-x-3">
                <FaUser className="text-blue-500 text-xl" />
                <span className="font-semibold">Name:</span>
                <span>{user?.name}</span>
              </p>
              <p className="flex items-center space-x-3">
                <FaEnvelope className="text-green-500 text-xl" />
                <span className="font-semibold">Email:</span>
                <span>{user?.email}</span>
              </p>
              <p className="flex items-center space-x-3">
                <FaPhone className="text-purple-500 text-xl" />
                <span className="font-semibold">Phone:</span>
                <span>{user?.phone || "Not provided"}</span>
              </p>
              <p className="flex items-center space-x-3">
                <FaHome className="text-orange-500 text-xl" />
                <span className="font-semibold">Address:</span>
                <span>{user?.address || "Not provided"}</span>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserDashboard;
