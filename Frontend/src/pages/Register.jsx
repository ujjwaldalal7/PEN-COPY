import React, { useState } from "react";
import Header_navbar from "../components/Header_navbar";
import Footer from "../components/Footer";
import TextField from "../components/TextField"; 
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api_url } from "../context/config";

const Register = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error("Password must be at least 8 characters, include one uppercase, one symbol, and one digit.");
      return;
    }
  
    try {
      const response = await fetch(`${api_url}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json(); // Parse JSON response
  
      if (result.success) {
        toast.success("Registration successful! Now LogIn");
        navigate('/login');
      } else {
        toast.error(result.message); // Show message from the backend
      }
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header_navbar />
      <form
        className="flex flex-1 items-center justify-center flex-col gap-4 w-full max-w-md mx-auto p-4 border border-gray-300 rounded-md shadow-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <TextField
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <TextField
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <TextField
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default Register;
