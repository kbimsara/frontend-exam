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
    <aside className="bg-white rounded-xl border border-slate-200/80 p-5 w-full lg:w-60 flex-shrink-0 h-fit lg:sticky lg:top-20">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
        <SlidersHorizontal className="w-4 h-4 text-slate-400" />
        <h2 className="text-sm font-semibold text-slate-900">Filters</h2>
      </div>

      {/* Categories */}
      <div className="mb-5 pb-5 border-b border-slate-100">
        <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
          Category
        </h3>
        <div className="space-y-0.5">
          {categories.map((category) => (
            <label
              key={category}
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md cursor-pointer text-sm transition-colors duration-150 ${
                selectedCategory === category
                  ? 'bg-slate-100 text-slate-900 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-3.5 h-3.5 text-slate-900 border-slate-300 focus:ring-slate-500 accent-slate-900"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-5 pb-5 border-b border-slate-100">
        <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
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
            className="input-base py-1.5 text-[13px]"
          />
          <span className="text-slate-300 text-xs flex-shrink-0">–</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) =>
              onPriceRangeChange({ ...priceRange, max: e.target.value })
            }
            className="input-base py-1.5 text-[13px]"
          />
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
          Sort By
        </h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="input-base py-1.5 text-[13px]"
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