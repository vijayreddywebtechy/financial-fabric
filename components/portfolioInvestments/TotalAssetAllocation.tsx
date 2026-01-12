'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalAssetAllocation: React.FC = () => {
  const chartData = {
    labels: ['Equity', 'Bonds', 'Property', 'Cash'],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: ['#1e3a8a', '#7c3aed', '#ec4899', '#10b981'],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            return label + ': ' + value + '%';
          }
        }
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Total Asset Allocation
      </h3>
      
      <div className="flex items-center justify-center gap-8">
        {/* Donut Chart */}
        <div className="h-64 w-64">
          <Doughnut data={chartData} options={chartOptions} />
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-blue-900 rounded-full"></span>
            <span className="text-sm text-gray-700">Equity</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
            <span className="text-sm text-gray-700">Bonds</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-pink-600 rounded-full"></span>
            <span className="text-sm text-gray-700">Property</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-600 rounded-full"></span>
            <span className="text-sm text-gray-700">Cash</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalAssetAllocation;
