import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import PageLayout from '../components/ui/PageLayout';
import { products, categories } from '../data/products';
import { Search, LayoutGrid, List, SearchX } from 'lucide-react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');

  const filterAndSortProducts = () => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (priceRange.min) {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(priceRange.min)
      );
    }

    if (priceRange.max) {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(priceRange.max)
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = filterAndSortProducts();

  return (
    <PageLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Products
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {filteredProducts.length} products found
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
          <button
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="w-4 h-4" />
            Grid
          </button>
          <button
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              viewMode === 'list'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
            List
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition placeholder:text-slate-400"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'flex flex-col gap-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <SearchX className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-lg font-semibold text-slate-900 mb-1">
                No products found
              </p>
              <p className="text-sm text-slate-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;