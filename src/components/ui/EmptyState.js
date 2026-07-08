import React from 'react';

const EmptyState = ({ icon: Icon, title, subtitle, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-slate-200 rounded-xl bg-white/50">
      {Icon && (
        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4 border border-slate-200/50">
          <Icon className="w-6 h-6 text-slate-500" />
        </div>
      )}
      <h3 className="text-base font-semibold text-slate-900 mb-1">{title}</h3>
      {subtitle && (
        <p className="text-[13px] text-slate-500 text-center max-w-sm mb-6">{subtitle}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
