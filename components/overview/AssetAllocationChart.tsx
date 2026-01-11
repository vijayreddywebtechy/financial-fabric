'use client';

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const AssetAllocationChart: React.FC = () => {
  const doughnutChartData = {
    labels: ['Retirement', 'Equity', 'Cash'],
    datasets: [
      {
        data: [50, 35, 15],
        backgroundColor: ['#16a34a', '#1e40af', '#a855f7'],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Asset Allocation
      </h3>
      <div className="h-64 flex items-center justify-center">
        <div className="relative w-full max-w-xs">
          <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row space-y-2 md:space-y-0 sm:space-x-4 justify-center">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-600 rounded-sm"></span>
          <span className="text-sm text-gray-700">Retirement</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-900 rounded-sm"></span>
          <span className="text-sm text-gray-700">Equity</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-purple-500 rounded-sm"></span>
          <span className="text-sm text-gray-700">Cash</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center mt-4">
        *Reg 28 Compliant
      </p>
    </div>
  );
};

export default AssetAllocationChart;
