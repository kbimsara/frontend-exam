import React from 'react';

const PageLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {title && (
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-6 tracking-tight">
            {title}
          </h1>
        )}
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
