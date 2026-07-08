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
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="flex-1 min-w-0 w-full">
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-base pl-9 py-2"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <span className="text-[13px] font-medium text-slate-500 tabular-nums">
                {filteredProducts.length} results
              </span>
              <div className="flex items-center bg-slate-100/80 rounded-lg p-0.5 border border-slate-200/60">
                <button
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                      : 'text-slate-400 hover:text-slate-700'
                  }`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-6'
                  : 'flex flex-col gap-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 px-4 border border-dashed border-slate-200 rounded-xl bg-white/50">
              <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4 border border-slate-200/50">
                <SearchX className="w-6 h-6 text-slate-500" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">
                No products found
              </h3>
              <p className="text-[13px] text-slate-500 text-center max-w-sm">
                We couldn't find any products matching your current filters. Try adjusting your search or categories.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;