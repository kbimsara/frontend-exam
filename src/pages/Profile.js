import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
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
    toast.success('Profile updated successfully');
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
    { label: 'Orders', value: '12', icon: ShoppingBag },
    { label: 'Total Spent', value: '$2,450', icon: DollarSign },
    { label: 'Wishlist', value: '8', icon: Heart },
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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Avatar Card */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 text-center">
            <div className="relative mx-auto w-20 h-20 mb-4">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white text-2xl font-medium tracking-tight">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm">
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>
            <h2 className="text-base font-semibold text-slate-900">{user.name}</h2>
            <p className="text-[13px] text-slate-500 mt-0.5">{user.role}</p>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-slate-900 tabular-nums leading-none mb-1">{value}</p>
                  <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400 leading-none">{label}</p>
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
                  className="btn-secondary py-1.5 px-3 text-[13px]"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn-secondary py-1.5 px-3 text-[13px]"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-primary py-1.5 px-3 text-[13px]"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save
                  </button>
                </div>
              )
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {fields.map(({ name, label, type, fullWidth }) => (
                <div key={name} className={fullWidth ? 'sm:col-span-2' : ''}>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    {label}
                  </label>
                  {isEditing && name !== 'email' ? (
                    <input
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="input-base"
                    />
                  ) : (
                    <p className="text-[13px] text-slate-900 font-medium py-1.5">
                      {formData[name]}
                    </p>
                  )}
                </div>
              ))}
              {/* Role — always read-only */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Role
                </label>
                <p className="text-[13px] text-slate-900 font-medium py-1.5">
                  {user.role}
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Order History */}
          <SectionCard title="Order History">
            <div className="overflow-x-auto -mx-5 -mb-5 px-5 pb-5">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr>
                    <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-100">
                      Order
                    </th>
                    <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-100">
                      Date
                    </th>
                    <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-100">
                      Items
                    </th>
                    <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-100">
                      Total
                    </th>
                    <th className="text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-100">
                      Status
                    </th>
                    <th className="pb-3 border-b border-slate-100"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {orderHistory.map((order) => (
                    <tr key={order.id} className="group">
                      <td className="py-3 text-[13px] font-medium text-slate-900 pr-4">
                        #{order.id}
                      </td>
                      <td className="py-3 text-[13px] text-slate-600 pr-4 tabular-nums">{order.date}</td>
                      <td className="py-3 text-[13px] text-slate-600 pr-4 tabular-nums">{order.items}</td>
                      <td className="py-3 text-[13px] font-medium text-slate-900 pr-4 tabular-nums">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="py-3 pr-4">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="py-3 text-right">
                        <button className="p-1.5 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors">
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
            <div className="space-y-4">
              {activityLog.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 relative"
                >
                  {index !== activityLog.length - 1 && (
                    <div className="absolute left-[15px] top-8 bottom-[-16px] w-[2px] bg-slate-100" />
                  )}
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200/60 flex items-center justify-center flex-shrink-0 z-10">
                    <ClipboardList className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0 pt-1.5">
                    <p className="text-[13px] font-medium text-slate-900">
                      {activity.action}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 tabular-nums">
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