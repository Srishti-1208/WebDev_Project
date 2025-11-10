// src/components/FiltersBar.jsx
import React from 'react';
import { Filter } from 'lucide-react';

export default function FiltersBar({
  categories,
  subjects,
  selectedCategory,
  setSelectedCategory,
  selectedSubject,
  setSelectedSubject,
  sortBy,
  setSortBy
}) {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 mb-8 shadow-xl border-2 border-amber-200/50">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-amber-700" />
        <h3 className="text-lg font-semibold text-amber-900">Filters</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2.5 bg-amber-50/80 border-2 border-amber-300/50 rounded-xl focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 transition-all text-amber-900 font-medium"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Filter */}
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-2">
            Subject
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-4 py-2.5 bg-orange-50/80 border-2 border-orange-300/50 rounded-xl focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all text-orange-900 font-medium"
          >
            {subjects.map(sub => (
              <option key={sub} value={sub}>
                {sub === 'all' ? 'All Subjects' : sub}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-amber-900 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2.5 bg-red-50/80 border-2 border-red-300/50 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all text-red-900 font-medium"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
    </div>
  );
}