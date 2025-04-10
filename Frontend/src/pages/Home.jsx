import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeaderNavbar from "../components/Header_navbar";
import { useAuth } from "../context/auth";
import ProductCard from "../components/ProductCard";
import { api_url } from "../context/config";
const Home = () => {
  const { isLoggedIn } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${api_url}/api/v1/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <HeaderNavbar />

      <pre className="text-center">
        {!isLoggedIn ? "Please Log in to continue shopping":""}
      </pre>

      <div className="container mx-auto p-4">
        {loading ? (
          <p className="text-center text-lg">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Home;
