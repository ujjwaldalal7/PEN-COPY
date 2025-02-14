import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../../components/TextField";
import Header_navbar from "../../components/Header_navbar";
import Footer from "../../components/Footer";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5500/api/v1/products/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (data.success) {
        alert("Product created successfully!");
        navigate("/admin/products");
      } else {
        alert("Error creating product: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      {/* Navbar */}
      <Header_navbar />

      {/* Form Container */}
      <div className="flex justify-center items-center flex-grow">
        <div className="w-full max-w-lg bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-center mb-4">Create Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
            />
            <TextField
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Product Description"
              required
            />
            <TextField
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />
            <TextField
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="Stock Quantity"
              required
            />
            <TextField
              type="text"
              name="image"
              value={product.image}
              onChange={handleChange}
              placeholder="Image URL"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CreateProduct;
