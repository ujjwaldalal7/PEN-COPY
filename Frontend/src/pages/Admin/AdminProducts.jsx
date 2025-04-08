import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api_url } from "../../context/config";

const AdminProducts = () => {
  const [products, setProducts] = useState([]); // Ensure it starts as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${api_url}/api/v1/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data || []); // Ensure it's an array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
  
    try {
      const token=localStorage.getItem("token")
      const response = await fetch(`${api_url}/api/v1/products/delete/${id}`, {
        method: "DELETE",
        headers: {  Authorization: `${token}`,
        "Content-Type": "application/json" },
      });
  
      const data = await response.json();
  
      if (data.success) {
        toast.success("Product deleted successfully!");
        setProducts(products.filter(product => product._id !== id)); // Update UI after deletion
      } else {
        toast.error("Error deleting product: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.");
    }
  };
  
  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="w-full bg-gray-100">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Stock</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t">
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">₹{product.price}</td>
                  <td className="py-2 px-4">{product.stock}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded-md" onClick={()=>handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
