// src/components/ResourceCard.jsx
import React from 'react';
import { BookOpen, Eye, Download, Heart, Star, Calendar, User } from 'lucide-react';

export default function ResourceCard({ resource, onLike, onDownload }) {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-amber-200/50 hover:border-amber-400/70 hover:scale-102">
      {/* Image Header - Reduced height */}
      <div className="h-32 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <BookOpen size={48} className="text-white/90 relative z-10 group-hover:scale-110 transition-transform" />
        
        {/* Board Badge */}
        <div className="absolute top-2 right-2 bg-white/95 backdrop-blur px-2.5 py-0.5 rounded-full text-xs font-bold text-amber-900 shadow-md">
          {resource.board}
        </div>
      </div>

      {/* Content - Reduced padding */}
      <div className="p-3.5">
        {/* Title - Smaller font */}
        <h3 className="text-base font-bold text-amber-900 mb-1.5 line-clamp-2 group-hover:text-orange-700 transition-colors">
          {resource.title}
        </h3>

        {/* Description - Smaller text */}
        <p className="text-xs text-gray-700 mb-2 line-clamp-2">
          {resource.description}
        </p>

        {/* Category & Subject Tags - Smaller */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="px-2 py-0.5 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-xs font-semibold rounded-full border border-amber-300">
            {resource.category}
          </span>
          <span className="px-2 py-0.5 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 text-xs font-semibold rounded-full border border-orange-300">
            {resource.subject}
          </span>
        </div>

        {/* Tags - Smaller */}
        <div className="flex flex-wrap gap-1 mb-2.5">
          {resource.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-1.5 py-0.5 bg-amber-50/80 text-amber-700 text-xs rounded border border-amber-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author & Date - More compact */}
        <div className="flex items-center justify-between mb-2.5 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <User size={12} className="text-amber-600" />
            <span className="font-medium text-amber-800">{resource.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={12} className="text-orange-600" />
            <span className="text-orange-800">{new Date(resource.date).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Stats - More compact */}
        <div className="grid grid-cols-3 gap-1.5 mb-2.5 p-2 bg-gradient-to-r from-amber-50/80 via-orange-50/80 to-red-50/80 rounded-lg border border-amber-200">
          <div className="text-center">
            <Eye size={14} className="mx-auto text-amber-600 mb-0.5" />
            <p className="text-xs font-semibold text-amber-900">{resource.views}</p>
          </div>
          <div className="text-center">
            <Download size={14} className="mx-auto text-orange-600 mb-0.5" />
            <p className="text-xs font-semibold text-orange-900">{resource.downloads}</p>
          </div>
          <div className="text-center">
            <Heart size={14} className="mx-auto text-red-600 mb-0.5" />
            <p className="text-xs font-semibold text-red-900">{resource.likes}</p>
          </div>
        </div>

        {/* Rating - Smaller */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(resource.rating)
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm font-bold text-amber-900 ml-1">{resource.rating}</span>
          </div>
          <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
            {resource.grade}
          </span>
        </div>

        {/* Action Buttons - Smaller */}
        <div className="flex gap-2">
          <button
            onClick={() => onLike(resource.id)}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-1.5 text-sm rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <Heart size={14} />
            Like
          </button>
          <button
            onClick={() => onDownload(resource.id)}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-1.5 text-sm rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <Download size={14} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}