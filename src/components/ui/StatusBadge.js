import React from 'react';

const statusStyles = {
  Delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Shipped: 'bg-blue-50 text-blue-700 ring-blue-600/20',
  Processing: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Pending: 'bg-rose-50 text-rose-700 ring-rose-600/20',
};

const StatusBadge = ({ status }) => {
  const style = statusStyles[status] || 'bg-slate-50 text-slate-700 ring-slate-600/20';

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${style}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
