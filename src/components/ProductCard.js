import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import StarRating from './ui/StarRating';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {product.stock < 10 && (
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
              Low Stock
            </span>
          )}
          {product.rating >= 4.5 && (
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">
              Best Seller
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Category */}
        <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide mb-1">
          {product.category}
        </span>

        {/* Title */}
        <h3 className="text-base font-semibold text-slate-900 mb-2 line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mb-3">
          <StarRating rating={product.rating} />
        </div>

        {/* Price & Stock */}
        <div className="flex items-center justify-between mt-auto mb-4">
          <p className="text-xl font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-xs text-slate-500">
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-4 h-4" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;