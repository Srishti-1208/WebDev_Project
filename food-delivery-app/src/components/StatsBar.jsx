// src/components/StatsBar.jsx
import React from 'react';
import { FileText, Eye, Download } from 'lucide-react';

export default function StatsBar({ resources }) {
  const totalViews = resources.reduce((sum, r) => sum + r.views, 0);
  const totalDownloads = resources.reduce((sum, r) => sum + r.downloads, 0);

  const stats = [
    {
      icon: FileText,
      label: 'Total Resources',
      value: resources.length,
      bgColor: 'from-amber-500 to-orange-500',
      lightBg: 'bg-amber-50/90'
    },
    {
      icon: Eye,
      label: 'Total Views',
      value: totalViews.toLocaleString(),
      bgColor: 'from-orange-500 to-red-500',
      lightBg: 'bg-orange-50/90'
    },
    {
      icon: Download,
      label: 'Total Downloads',
      value: totalDownloads.toLocaleString(),
      bgColor: 'from-red-500 to-pink-500',
      lightBg: 'bg-red-50/90'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-lg border border-amber-200/50 hover:shadow-xl hover:scale-102 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-amber-900 mb-0.5">{stat.label}</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent">
                {stat.value}
              </p>
            </div>
            <div className={`w-11 h-11 bg-gradient-to-br ${stat.bgColor} rounded-lg flex items-center justify-center shadow-md`}>
              <stat.icon size={22} className="text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}