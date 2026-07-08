import React from 'react';

const statusStyles = {
  Delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
  Shipped: 'bg-blue-50 text-blue-700 border-blue-200/60',
  Processing: 'bg-amber-50 text-amber-700 border-amber-200/60',
  Pending: 'bg-slate-50 text-slate-700 border-slate-200/60',
};

const StatusBadge = ({ status }) => {
  const style = statusStyles[status] || 'bg-slate-50 text-slate-700 border-slate-200/60';

  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium border ${style}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
