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
  { key: 'revenue', label: 'Total Revenue', icon: DollarSign },
  { key: 'orders', label: 'Total Orders', icon: Package },
  { key: 'avg', label: 'Avg. Order Value', icon: BarChart3 },
  { key: 'products', label: 'Total Products', icon: ShoppingBag },
  { key: 'cartItems', label: 'Cart Items', icon: ShoppingCart },
  { key: 'cartTotal', label: 'Cart Total', icon: Wallet },
];

const changeConfig = {
  revenue: { text: '12.5%', type: 'positive' },
  orders: { text: '8.3%', type: 'positive' },
  avg: { text: '2.1%', type: 'negative' },
  products: { text: '0.0%', type: 'neutral' },
  cartItems: { text: 'N/A', type: 'neutral' },
  cartTotal: { text: 'N/A', type: 'neutral' },
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
    positive: 'text-emerald-700 bg-emerald-50 border-emerald-200/60',
    negative: 'text-red-700 bg-red-50 border-red-200/60',
    neutral: 'text-slate-600 bg-slate-100 border-slate-200/60',
  };

  return (
    <PageLayout title="Dashboard">
      <div className="flex justify-end mb-6 -mt-14 relative z-10">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="input-base py-1.5 text-[13px] w-auto inline-block"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {statCardConfig.map(({ key, label, icon: Icon }) => {
          const change = changeConfig[key];
          return (
            <div
              key={key}
              className="bg-white rounded-xl border border-slate-200/80 p-5 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-slate-500 font-medium">{label}</p>
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                  <Icon className="w-4 h-4 text-slate-700" />
                </div>
              </div>
              <div className="flex items-end gap-3">
                <p className="text-2xl font-semibold text-slate-900 tracking-tight tabular-nums">
                  {statValues[key]}
                </p>
                {change.text !== 'N/A' && (
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded-md border mb-1 tabular-nums ${changeStyles[change.type]}`}
                  >
                    {change.type === 'positive' && <TrendingUp className="w-3 h-3" />}
                    {change.type === 'negative' && <TrendingDown className="w-3 h-3" />}
                    {change.text}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts + Panels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart — Full Width */}
        <SectionCard title="Sales Overview" className="lg:col-span-2">
          <div className="flex items-end justify-between gap-2 h-56 pt-4">
            {salesData.map((data, index) => {
              const heightPercent = (data.sales / maxSales) * 100;
              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center justify-end gap-2 group relative h-full"
                >
                  <span className="absolute -top-7 text-[11px] font-medium text-slate-900 bg-white border border-slate-200 shadow-sm rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none tabular-nums">
                    ${data.sales.toLocaleString()}
                  </span>
                  <div
                    className="w-full max-w-[40px] bg-slate-800 rounded-t-sm transition-all duration-300 group-hover:bg-slate-900 cursor-pointer"
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className="text-[11px] text-slate-400 font-medium uppercase tracking-wider flex-shrink-0">
                    {data.month.slice(0,3)}
                  </span>
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* Top Selling Products */}
        <SectionCard title="Top Selling Products">
          <div className="space-y-1">
            {topSellingProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center gap-4 py-2"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200/60 overflow-hidden flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-medium text-slate-900 truncate">
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{product.sales} sales</p>
                </div>
                <span className="text-[13px] font-semibold text-slate-900 flex-shrink-0 tabular-nums">
                  ${product.price}
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Recent Orders */}
        <SectionCard title="Recent Orders">
          <div className="overflow-x-auto -mx-5 -mb-5 px-5 pb-5">
            <table className="w-full min-w-[400px]">
              <thead>
                <tr>
                  <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-100">
                    Order
                  </th>
                  <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-100">
                    Customer
                  </th>
                  <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-100">
                    Total
                  </th>
                  <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-100">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="group">
                    <td className="py-3 text-[13px] font-medium text-slate-900 pr-4">
                      #{order.id}
                    </td>
                    <td className="py-3 text-[13px] text-slate-600 pr-4">
                      {order.customer}
                    </td>
                    <td className="py-3 text-[13px] font-medium text-slate-900 pr-4 tabular-nums">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-3">
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
            <p className="text-center text-slate-500 py-6 text-[13px]">
              All products are well stocked.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-amber-200/60 bg-amber-50/50"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-md object-cover flex-shrink-0 border border-amber-200/50"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-medium text-slate-900 truncate">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-1 mt-1 text-amber-700">
                      <AlertTriangle className="w-3 h-3" />
                      <p className="text-[11px] font-medium">
                        {product.stock} remaining
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