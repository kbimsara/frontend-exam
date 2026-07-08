import React from 'react';

const SectionCard = ({ children, title, className = '', headerRight }) => {
  return (
    <section className={`bg-white rounded-xl border border-slate-200/80 overflow-hidden ${className}`}>
      {title && (
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
};

export default SectionCard;
