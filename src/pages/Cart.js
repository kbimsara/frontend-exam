import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
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
  Lightbulb,
  ArrowLeft,
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
    } else if (couponCode === 'SAVE20') {
      setDiscount(20);
      setCouponApplied(true);
    } else {
      alert('Invalid coupon code');
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
          subtitle="Add some products to get started"
          action={
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="text-lg font-semibold text-slate-900">
                  Items ({cartItems.length})
                </h2>
              </div>

              {/* Desktop Table */}
              <div className="hidden sm:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-3">
                        Product
                      </th>
                      <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">
                        Price
                      </th>
                      <th className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">
                        Quantity
                      </th>
                      <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wide px-4 py-3">
                        Total
                      </th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {cartItems.map((item) => (
                      <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div>
                              <h3 className="text-sm font-semibold text-slate-900">
                                {item.name}
                              </h3>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {item.category}
                              </p>
                              {item.stock < 10 && (
                                <p className="text-xs text-amber-600 font-medium mt-1">
                                  Only {item.stock} left!
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm font-semibold text-slate-900">
                            ${item.price.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleDecrement(item)}
                              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncrement(item)}
                              className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:border-slate-300 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right">
                          <span className="text-sm font-bold text-slate-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="p-2 rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="sm:hidden divide-y divide-slate-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-slate-900 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-slate-500">{item.category}</p>
                        <p className="text-base font-bold text-slate-900 mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="p-1.5 h-fit rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecrement(item)}
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(item)}
                          className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-slate-900 mb-5">
                Order Summary
              </h2>

              {/* Coupon */}
              <div className="flex gap-2 mb-5">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Tag className="w-4 h-4 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition disabled:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
                <button
                  onClick={handleApplyCoupon}
                  disabled={couponApplied}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </button>
              </div>

              {couponApplied && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 mb-5">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs text-emerald-700 font-medium">
                    Coupon "{couponCode}" applied successfully!
                  </span>
                </div>
              )}

              {/* Summary Rows */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (8%)</span>
                  <span className="font-medium text-slate-900">${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({discount}%)</span>
                    <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-200 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-slate-900">Total</span>
                  <span className="text-xl font-bold text-slate-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full mt-5 px-4 py-3 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 active:scale-[0.98] transition-all">
                Proceed to Checkout
              </button>

              {/* Payment Methods */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500 text-center mb-2">We accept</p>
                <div className="flex items-center justify-center gap-3">
                  <CreditCard className="w-5 h-5 text-slate-400" />
                  <Banknote className="w-5 h-5 text-slate-400" />
                  <Building2 className="w-5 h-5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Promo Tips */}
            <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-semibold text-amber-800">Tips</h3>
              </div>
              <ul className="space-y-2 text-sm text-amber-700">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  Use code SAVE10 for 10% off
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  Use code SAVE20 for 20% off
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-0.5">•</span>
                  Free shipping on orders over $100
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Cart;