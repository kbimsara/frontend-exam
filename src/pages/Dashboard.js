import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products, orders, salesData } from '../data/products';
import PageLayout from '../components/ui/PageLayout';
import SectionCard from '../components/ui/SectionCard';
import StatusBadge from '../components/ui/StatusBadge';
import {
  DollarSign,
  Package,
  BarChart3,
  ShoppingBag,
  ShoppingCart,
  Wallet,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from 'lucide-react';

const statCardConfig = [
  { key: 'revenue', label: 'Total Revenue', icon: DollarSign, color: 'bg-indigo-500' },
  { key: 'orders', label: 'Total Orders', icon: Package, color: 'bg-emerald-500' },
  { key: 'avg', label: 'Avg. Order Value', icon: BarChart3, color: 'bg-sky-500' },
  { key: 'products', label: 'Total Products', icon: ShoppingBag, color: 'bg-amber-500' },
  { key: 'cartItems', label: 'Cart Items', icon: ShoppingCart, color: 'bg-slate-500' },
  { key: 'cartTotal', label: 'Cart Total', icon: Wallet, color: 'bg-rose-500' },
];

const changeConfig = {
  revenue: { text: '+12.5% from last month', type: 'positive' },
  orders: { text: '+8.3% from last month', type: 'positive' },
  avg: { text: '-2.1% from last month', type: 'negative' },
  products: { text: 'No change', type: 'neutral' },
  cartItems: { text: 'Current session', type: 'neutral' },
  cartTotal: { text: 'Current session', type: 'neutral' },
};

const Dashboard = () => {
  const { getCartCount, getCartTotal } = useCart();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const topSellingProducts = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  const lowStockProducts = products.filter((p) => p.stock < 10);
  const recentOrders = orders.slice(0, 5);
  const maxSales = Math.max(...salesData.map((d) => d.sales));

  const statValues = {
    revenue: `$${totalRevenue.toFixed(2)}`,
    orders: totalOrders,
    avg: `$${averageOrderValue.toFixed(2)}`,
    products: products.length,
    cartItems: getCartCount(),
    cartTotal: `$${getCartTotal().toFixed(2)}`,
  };

  const changeStyles = {
    positive: 'text-emerald-700 bg-emerald-50',
    negative: 'text-rose-700 bg-rose-50',
    neutral: 'text-slate-600 bg-slate-100',
  };

  return (
    <PageLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Dashboard</h1>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {statCardConfig.map(({ key, label, icon: Icon, color }) => {
          const change = changeConfig[key];
          return (
            <div
              key={key}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-500 font-medium">{label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5 truncate">
                  {statValues[key]}
                </p>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium mt-2 px-2 py-0.5 rounded-full ${changeStyles[change.type]}`}
                >
                  {change.type === 'positive' && <TrendingUp className="w-3 h-3" />}
                  {change.type === 'negative' && <TrendingDown className="w-3 h-3" />}
                  {change.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts + Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart — Full Width */}
        <SectionCard title="Sales Overview" className="lg:col-span-2">
          <div className="flex items-end justify-between gap-2 h-64 pt-4">
            {salesData.map((data, index) => {
              const heightPercent = (data.sales / maxSales) * 100;
              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-1 group"
                >
                  <span className="text-xs text-slate-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    ${data.sales.toLocaleString()}
                  </span>
                  <div
                    className="w-full max-w-[48px] bg-indigo-500 rounded-t-lg transition-all duration-300 group-hover:bg-indigo-600 cursor-pointer"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-xs text-slate-500 font-medium mt-1">
                    {data.month}
                  </span>
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* Top Selling Products */}
        <SectionCard title="Top Selling Products">
          <div className="space-y-3">
            {topSellingProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {index + 1}
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-slate-900 truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-slate-500">{product.sales} sales</p>
                </div>
                <span className="text-sm font-bold text-slate-900 flex-shrink-0">
                  ${product.price}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Recent Orders */}
        <SectionCard title="Recent Orders">
          <div className="overflow-x-auto -mx-6">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-2">
                    Order
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-2">
                    Customer
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-2">
                    Total
                  </th>
                  <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-2">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3 text-sm font-medium text-slate-900">
                      #{order.id}
                    </td>
                    <td className="px-3 py-3 text-sm text-slate-600">
                      {order.customer}
                    </td>
                    <td className="px-3 py-3 text-sm font-semibold text-slate-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Low Stock Alert */}
        <SectionCard title="Low Stock Alert" className="lg:col-span-2">
          {lowStockProducts.length === 0 ? (
            <p className="text-center text-emerald-600 py-6 text-sm font-medium">
              All products are well stocked
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-900 truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      <p className="text-xs font-medium text-amber-700">
                        Only {product.stock} left
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      </div>
    </PageLayout>
  );
};

export default Dashboard;