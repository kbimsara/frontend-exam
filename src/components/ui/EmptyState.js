import React from 'react';

const EmptyState = ({ icon: Icon, title, subtitle, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {Icon && (
        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
          <Icon className="w-10 h-10 text-slate-400" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-slate-900 mb-2">{title}</h3>
      {subtitle && (
        <p className="text-slate-500 text-center max-w-sm mb-6">{subtitle}</p>
      )}
      {action && action}
    </div>
  );
};

export default EmptyState;
