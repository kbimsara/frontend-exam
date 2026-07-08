import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageLayout from '../components/ui/PageLayout';
import EmptyState from '../components/ui/EmptyState';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Tag,
  CheckCircle,
  CreditCard,
  Banknote,
  Building2,
  ArrowLeft,
  AlertCircle,
  Lightbulb
} from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const handleIncrement = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = (item) => {
    updateQuantity(item.id, item.quantity - 1);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleApplyCoupon = () => {
    if (couponCode === 'SAVE10') {
      setDiscount(10);
      setCouponApplied(true);
      toast.success('Coupon SAVE10 applied!');
    } else if (couponCode === 'SAVE20') {
      setDiscount(20);
      setCouponApplied(true);
      toast.success('Coupon SAVE20 applied!');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.08;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + shipping + tax - discountAmount;

  return (
    <PageLayout title="Shopping Cart">
      {cartItems.length === 0 ? (
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          subtitle="Add some products to your cart to get started."
          action={
            <Link
              to="/"
              className="btn-primary"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          }
        />
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Cart Items */}
          <div className="flex-1 w-full bg-white rounded-xl border border-slate-200/80 overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-[13px] font-semibold text-slate-900 uppercase tracking-wider">
                Cart Items ({cartItems.length})
              </h2>
            </div>

            <div className="divide-y divide-slate-100">
              {cartItems.map((item) => (
                <div key={item.id} className="p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <div className="relative w-20 h-20 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200/60">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-medium text-slate-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-[12px] text-slate-500 mt-0.5">{item.category}</p>
                    
                    {item.stock < 10 && (
                      <div className="flex items-center gap-1 mt-2 text-amber-600">
                        <AlertCircle className="w-3 h-3" />
                        <span className="text-[11px] font-medium">Only {item.stock} remaining</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrement(item)}
                        className="w-7 h-7 rounded border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-[13px] font-medium text-slate-900 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(item)}
                        className="w-7 h-7 rounded border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex flex-col items-end gap-1 w-20">
                      <span className="text-[13px] font-semibold text-slate-900 tabular-nums">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <span className="text-[11px] text-slate-400 tabular-nums">
                        ${item.price.toFixed(2)} each
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-1.5 rounded-md text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors ml-2"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-4 lg:sticky lg:top-20">
            <div className="bg-white rounded-xl border border-slate-200/80 p-5">
              <h2 className="text-sm font-semibold text-slate-900 mb-4">
                Order Summary
              </h2>

              {/* Coupon */}
              <div className="flex gap-2 mb-5">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                    className="input-base pl-8 py-1.5"
                  />
                </div>
                <button
                  onClick={handleApplyCoupon}
                  disabled={couponApplied}
                  className="btn-secondary py-1.5 px-3 whitespace-nowrap text-[13px]"
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </button>
              </div>

              {couponApplied && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-100 mb-5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs text-emerald-700 font-medium">
                    Coupon "{couponCode}" applied
                  </span>
                </div>
              )}

              {/* Summary Rows */}
              <div className="space-y-2.5 text-[13px]">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900 tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900 tabular-nums">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-slate-900 tabular-nums">${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({discount}%)</span>
                    <span className="font-medium tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 mt-4 pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-slate-900">Total</span>
                  <span className="text-lg font-bold text-slate-900 tabular-nums tracking-tight">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="btn-primary w-full mt-5">
                Proceed to Checkout
              </button>

              {/* Payment Methods */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-3">
                <CreditCard className="w-4 h-4 text-slate-400" />
                <Banknote className="w-4 h-4 text-slate-400" />
                <Building2 className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Promo Tips */}
            <div className="bg-slate-50 rounded-xl border border-slate-200/80 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-3.5 h-3.5 text-slate-500" />
                <h3 className="text-[13px] font-medium text-slate-700">Saving Tips</h3>
              </div>
              <ul className="space-y-1 text-[12px] text-slate-500 pl-5 list-disc list-outside ml-0.5">
                <li>Use code <strong>SAVE10</strong> for 10% off</li>
                <li>Use code <strong>SAVE20</strong> for 20% off</li>
                <li>Free shipping on orders over $100</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Cart;