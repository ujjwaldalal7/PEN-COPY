import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const isOutOfStock = product.stock === 0; // Check if product is out of stock

  return (
    <div className={`border p-4 rounded-lg shadow-lg ${isOutOfStock ? "opacity-50" : "hover:shadow-xl"} transition`}>
      <div className="w-full h-40 bg-white">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
      </div>
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">₹{product.price.toFixed(2)}</p>

      {isOutOfStock ? (
        <p className="mt-2 text-red-500 font-semibold">Out of Stock</p>
      ) : (
        <Link
          to={`/product/${product._id}`}
          className="block mt-2 text-blue-600 hover:underline"
        >
          View Details
        </Link>
      )}
    </div>
  );
};

export default ProductCard;
