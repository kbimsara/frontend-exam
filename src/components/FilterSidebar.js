import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

const FilterSidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <aside className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 w-full lg:w-64 flex-shrink-0 h-fit sticky top-24">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
        <h2 className="text-base font-semibold text-slate-900">Filters</h2>
      </div>

      {/* Categories */}
      <div className="mb-6 pb-6 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) =>
              onPriceRangeChange({ ...priceRange, min: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
          <span className="text-slate-400 text-sm flex-shrink-0">to</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) =>
              onPriceRangeChange({ ...priceRange, max: e.target.value })
            }
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
          Sort By
        </h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
        >
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rating</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;