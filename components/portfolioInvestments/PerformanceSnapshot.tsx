'use client';

import React from 'react';

interface PerformanceMetric {
  label: string;
  value: string;
}

const PerformanceSnapshot: React.FC = () => {
  const metrics: PerformanceMetric[] = [
    { label: 'Current Month', value: '+ 0.72%' },
    { label: 'Quarter to Date', value: '+ 3.46%' },
    { label: 'FYTD', value: '+ 6.23%' },
    { label: '1 Year', value: '+ 9.33%' },
    { label: '3 Years (Ann.)', value: '+ 9.48%' },
    { label: '5 Years (Ann.)', value: '+ 10.12%' },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Performance Snapshot (Weighted Average)
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">{metric.label}</p>
            <p className="text-lg font-medium text-green-800">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceSnapshot;
