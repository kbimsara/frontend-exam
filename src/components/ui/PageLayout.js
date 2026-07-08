import React from 'react';
import Navbar from '../Navbar';

const PageLayout = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {title && (
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
            {title}
          </h1>
        )}
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
