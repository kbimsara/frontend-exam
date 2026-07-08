import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PageLayout from '../components/ui/PageLayout';
import SectionCard from '../components/ui/SectionCard';
import StatusBadge from '../components/ui/StatusBadge';
import {
  Pencil,
  Save,
  X,
  Camera,
  ShoppingBag,
  DollarSign,
  Heart,
  ClipboardList,
  Eye,
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    country: 'United States',
    postalCode: '10001',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const orderHistory = [
    { id: 1001, date: '2024-12-20', items: 3, total: 249.98, status: 'Delivered' },
    { id: 1002, date: '2024-11-15', items: 1, total: 899.99, status: 'Delivered' },
    { id: 1003, date: '2024-10-05', items: 5, total: 159.97, status: 'Delivered' },
  ];

  const activityLog = [
    { action: 'Logged in', timestamp: '2024-12-27 10:30 AM' },
    { action: 'Added Laptop Computer to cart', timestamp: '2024-12-26 03:15 PM' },
    { action: 'Updated profile information', timestamp: '2024-12-25 11:20 AM' },
    { action: 'Placed order #1003', timestamp: '2024-12-22 02:45 PM' },
  ];

  const stats = [
    { label: 'Orders', value: '12', icon: ShoppingBag, color: 'text-indigo-600' },
    { label: 'Total Spent', value: '$2,450', icon: DollarSign, color: 'text-emerald-600' },
    { label: 'Wishlist', value: '8', icon: Heart, color: 'text-rose-500' },
  ];

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text' },
    { name: 'email', label: 'Email Address', type: 'email' },
    { name: 'phone', label: 'Phone Number', type: 'tel' },
    { name: 'address', label: 'Address', type: 'text', fullWidth: true },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'country', label: 'Country', type: 'text' },
    { name: 'postalCode', label: 'Postal Code', type: 'text' },
  ];

  return (
    <PageLayout title="My Profile">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Avatar Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold ring-4 ring-white shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <h2 className="text-lg font-bold text-slate-900">{user.name}</h2>
            <p className="text-sm text-slate-500 mt-0.5">{user.role}</p>
            <button className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              <Camera className="w-4 h-4" />
              Change Avatar
            </button>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900">{value}</p>
                  <p className="text-xs text-slate-500">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Personal Information */}
          <SectionCard
            title="Personal Information"
            headerRight={
              !isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                </div>
              )
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {fields.map(({ name, label, type, fullWidth }) => (
                <div key={name} className={fullWidth ? 'sm:col-span-2' : ''}>
                  <label className="block text-sm font-medium text-slate-500 mb-1.5">
                    {label}
                  </label>
                  {name === 'email' && !isEditing ? (
                    <p className="text-sm text-slate-900 py-2">{formData[name]}</p>
                  ) : isEditing && name !== 'role' ? (
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                  ) : (
                    <p className="text-sm text-slate-900 py-2">{formData[name]}</p>
                  )}
                </div>
              ))}
              {/* Role — always read-only */}
              <div>
                <label className="block text-sm font-medium text-slate-500 mb-1.5">
                  Role
                </label>
                <p className="text-sm text-slate-900 py-2">{user.role}</p>
              </div>
            </div>
          </SectionCard>

          {/* Order History */}
          <SectionCard title="Order History">
            <div className="overflow-x-auto -mx-6">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-6 py-2">
                      Order
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-2">
                      Date
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-2">
                      Items
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-2">
                      Total
                    </th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide px-3 py-2">
                      Status
                    </th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {orderHistory.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-3 text-sm font-medium text-slate-900">
                        #{order.id}
                      </td>
                      <td className="px-3 py-3 text-sm text-slate-600">{order.date}</td>
                      <td className="px-3 py-3 text-sm text-slate-600">{order.items}</td>
                      <td className="px-3 py-3 text-sm font-semibold text-slate-900">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-3 py-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="px-3 py-3">
                        <button className="p-2 rounded-lg text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* Recent Activity */}
          <SectionCard title="Recent Activity">
            <div className="space-y-1">
              {activityLog.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ClipboardList className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">
                      {activity.action}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </PageLayout>
  );
};

export default Profile;