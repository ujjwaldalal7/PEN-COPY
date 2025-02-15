const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition">
      <div className="w-full h-40 bg-white">
  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
</div>
      <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
