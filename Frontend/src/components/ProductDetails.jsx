import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5500/api/v1/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!product) return;
    
    try {
      // Get logged-in user ID
      const userRes = await fetch("http://localhost:5500/api/v1/auth/me", {
        headers: { Authorization: token },
      });
      const userData = await userRes.json();
      if (!userData._id) throw new Error("User not found");

      // Add item to cart in database
      const res = await fetch("http://localhost:5500/api/v1/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData._id,
          productId: product._id,
          name: product.name,
          price: product.price,
        }),
      });

      if (!res.ok) throw new Error("Failed to add product to cart");
      toast.success("Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  if (loading)
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  if (!product)
    return <div className="flex justify-center items-center h-screen text-lg">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[500px] aspect-[4/3] object-contain rounded-lg shadow-md transform transition duration-300 hover:scale-105"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
          <p className="text-2xl font-bold text-blue-600">₹{product.price}</p>

          <button
            onClick={addToCart}
            className="mt-6 w-full md:w-1/2 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
