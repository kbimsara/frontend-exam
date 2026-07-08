import React from 'react';

const SectionCard = ({ children, title, className = '', headerRight }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
      {title && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default SectionCard;
