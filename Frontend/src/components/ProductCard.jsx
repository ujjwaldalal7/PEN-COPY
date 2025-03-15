import { Link } from "react-router-dom";

// const ProductCard = ({ product }) => {
//   return (
//     <div className="border p-4 rounded-lg shadow-lg">
//       <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
//       <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
//       <p className="text-gray-600">${product.price}</p>

//       {/* Link to Product Details Page */}
//       <Link
//         to={`/product/${product._id}`}
//         className="block mt-2 text-blue-600 hover:underline"
//       >
//         View Details
//       </Link>
//     </div>
//   );
// };

// export default ProductCard;
const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition">
      <div className="w-full h-40 bg-white">
  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
</div>
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
      <Link
        to={`/product/${product._id}`}
        className="block mt-2 text-blue-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
};
export default ProductCard; 