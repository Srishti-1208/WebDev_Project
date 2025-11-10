// src/components/ResourceCard.jsx
import React from 'react';
import { BookOpen, Eye, Download, Heart, Star, Calendar, User } from 'lucide-react';

export default function ResourceCard({ resource, onLike, onDownload }) {
  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group border-2 border-amber-200/50 hover:border-amber-400/70 hover:scale-105">
      {/* Image Header */}
      <div className="h-48 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <BookOpen size={64} className="text-white/90 relative z-10 group-hover:scale-110 transition-transform" />
        
        {/* Board Badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-amber-900 shadow-lg">
          {resource.board}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-amber-900 mb-2 line-clamp-2 group-hover:text-orange-700 transition-colors">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {resource.description}
        </p>

        {/* Category & Subject Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-3 py-1 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 text-xs font-semibold rounded-full border border-amber-300">
            {resource.category}
          </span>
          <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 text-xs font-semibold rounded-full border border-orange-300">
            {resource.subject}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-amber-50/80 text-amber-700 text-xs rounded-md border border-amber-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author & Date */}
        <div className="flex items-center justify-between mb-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <User size={14} className="text-amber-600" />
            <span className="font-medium text-amber-800">{resource.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-orange-600" />
            <span className="text-orange-800">{new Date(resource.date).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gradient-to-r from-amber-50/80 via-orange-50/80 to-red-50/80 rounded-xl border border-amber-200">
          <div className="text-center">
            <Eye size={16} className="mx-auto text-amber-600 mb-1" />
            <p className="text-xs font-semibold text-amber-900">{resource.views}</p>
          </div>
          <div className="text-center">
            <Download size={16} className="mx-auto text-orange-600 mb-1" />
            <p className="text-xs font-semibold text-orange-900">{resource.downloads}</p>
          </div>
          <div className="text-center">
            <Heart size={16} className="mx-auto text-red-600 mb-1" />
            <p className="text-xs font-semibold text-red-900">{resource.likes}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${
                  i < Math.floor(resource.rating)
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm font-bold text-amber-900 ml-1">{resource.rating}</span>
          </div>
          <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-md border border-amber-300">
            {resource.grade}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onLike(resource.id)}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Heart size={16} />
            Like
          </button>
          <button
            onClick={() => onDownload(resource.id)}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>
    </div>
  );
}