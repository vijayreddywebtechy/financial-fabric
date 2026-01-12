'use client';

import React from 'react';

interface Region {
  name: string;
  color: string;
}

const GeographicAllocation: React.FC = () => {
  const regions: Region[] = [
    { name: 'South Africa', color: 'bg-blue-900' },
    { name: 'USA', color: 'bg-orange-500' },
    { name: 'UK', color: 'bg-purple-600' },
    { name: 'China', color: 'bg-pink-500' },
    { name: 'Europe', color: 'bg-purple-400' },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Geographic Allocation
      </h3>
      
      {/* Simplified World Map Representation */}
      <div className="relative bg-gray-100 rounded-lg p-8 mb-6" style={{ height: '300px' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <svg
              className="w-full h-full opacity-10"
              viewBox="0 0 800 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified world map outline */}
              <path
                d="M100 200 L200 180 L250 200 L300 190 L350 200 L400 180 L450 190 L500 200 L550 180 L600 190 L650 200 L700 180"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <ellipse cx="200" cy="200" rx="40" ry="30" fill="currentColor" opacity="0.2" />
              <ellipse cx="350" cy="180" rx="50" ry="35" fill="currentColor" opacity="0.2" />
              <ellipse cx="500" cy="200" rx="45" ry="32" fill="currentColor" opacity="0.2" />
              <ellipse cx="600" cy="190" rx="35" ry="25" fill="currentColor" opacity="0.2" />
            </svg>
            
            {/* Regional indicators */}
            <div className="absolute top-4 left-4">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              <p className="text-xs text-gray-600 mt-1">USA</p>
            </div>
            <div className="absolute top-8 left-1/3">
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-pulse"></div>
              <p className="text-xs text-gray-600 mt-1">UK</p>
            </div>
            <div className="absolute top-12 right-1/4">
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
              <p className="text-xs text-gray-600 mt-1">China</p>
            </div>
            <div className="absolute bottom-8 left-1/4">
              <div className="w-3 h-3 bg-blue-900 rounded-full animate-pulse"></div>
              <p className="text-xs text-gray-600 mt-1">South Africa</p>
            </div>
            <div className="absolute top-6 left-1/2">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <p className="text-xs text-gray-600 mt-1">Europe</p>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4">
        {regions.map((region, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className={`w-3 h-3 ${region.color} rounded-full`}></span>
            <span className="text-sm text-gray-700">{region.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeographicAllocation;
