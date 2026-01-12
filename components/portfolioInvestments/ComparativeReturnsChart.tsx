'use client';

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type TimePeriod = '1M' | '3M' | 'FYTD' | '6M' | '1Y' | '3Y' | '5Y';

const ComparativeReturnsChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('1Y');

  const periods: TimePeriod[] = ['1M', '3M', 'FYTD', '6M', '1Y', '3Y', '5Y'];

  const chartData = {
    labels: ['2024', 'Q2', 'Q3', 'Q4', '2025'],
    datasets: [
      {
        label: 'Standard Bank Pension Fund',
        data: [900000, 950000, 1000000, 1050000, 1100000],
        borderColor: '#1e3a8a',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'Retirement Annuity Fund',
        data: [800000, 840000, 880000, 920000, 960000],
        borderColor: '#7c3aed',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'Tax Free Savings Account',
        data: [700000, 720000, 740000, 760000, 780000],
        borderColor: '#0ea5e9',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'International Endowment',
        data: [400000, 410000, 420000, 430000, 440000],
        borderColor: '#ec4899',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'Direct Unit Trust Investment',
        data: [600000, 630000, 660000, 690000, 720000],
        borderColor: '#14b8a6',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'Direct Equity Investment',
        data: [500000, 550000, 600000, 650000, 700000],
        borderColor: '#10b981',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'Bank Deposit',
        data: [300000, 310000, 320000, 330000, 340000],
        borderColor: '#6b7280',
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 12,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: string | number) => {
            return 'R ' + (Number(value) / 1000000).toFixed(1) + 'M';
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="text-lg font-medium text-gray-900">
          Comparative Returns Over Time (Cumulative %)
        </h3>
        
        {/* Time Period Buttons */}
        <div className="flex flex-wrap gap-2">
          {periods.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`
                px-3 py-1.5 text-xs md:text-sm rounded transition-colors
                ${
                  selectedPeriod === period
                    ? 'bg-[#0062E1] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ComparativeReturnsChart;
