import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import StarRating from './ui/StarRating';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-xl border border-slate-200/80 overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md hover:border-slate-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Badges */}
        {(product.stock < 10 || product.rating >= 4.5) && (
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
            {product.stock < 10 && (
              <span className="inline-flex px-2 py-0.5 text-[11px] font-medium rounded-md bg-amber-50 text-amber-700 border border-amber-200/60">
                Low Stock
              </span>
            )}
            {product.rating >= 4.5 && (
              <span className="inline-flex px-2 py-0.5 text-[11px] font-medium rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                Best Seller
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-1.5">
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          {product.category}
        </span>

        <h3 className="text-sm font-medium text-slate-900 leading-snug line-clamp-1">
          {product.name}
        </h3>

        <StarRating rating={product.rating} />

        {/* Price & Stock row — pushed to bottom */}
        <div className="flex items-baseline justify-between mt-auto pt-3">
          <span className="text-lg font-semibold text-slate-900 tabular-nums tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[11px] text-slate-400 tabular-nums">
            {product.stock > 0 ? `${product.stock} left` : 'Sold out'}
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="btn-primary mt-2 w-full text-[13px] py-2"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;