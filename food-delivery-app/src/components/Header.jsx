// src/components/Header.jsx
import React from 'react';
import { BookOpen, Search, Upload, LogOut, User } from 'lucide-react';

export default function Header({ onUploadClick, searchTerm, setSearchTerm, user, onLogout }) {
  return (
    <header className="bg-gradient-to-r from-amber-900/95 via-orange-900/95 to-red-900/95 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b-2 border-amber-700/50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-xl">
              <BookOpen className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                EduAid
              </h1>
              <p className="text-xs text-amber-200">Resource Sharing Platform</p>
            </div>
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center gap-4">
            {/* User Profile */}
            {user && (
              <div className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-amber-300/30 shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-xs text-amber-200 capitalize">{user.role}</p>
                </div>
              </div>
            )}

            {/* Upload Button */}
            <button
              onClick={onUploadClick}
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
            >
              <Upload size={20} />
              <span className="hidden sm:inline">Upload</span>
            </button>

            {/* Logout Button */}
            {user && onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
                title="Logout"
              >
                <LogOut size={20} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-700" size={20} />
          <input
            type="text"
            placeholder="Search resources, topics, boards (CBSE, ICSE)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/95 backdrop-blur border-2 border-amber-300/50 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all shadow-lg"
          />
        </div>
      </div>
    </header>
  );
}