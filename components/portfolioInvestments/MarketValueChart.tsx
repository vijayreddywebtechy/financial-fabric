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

const MarketValueChart: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('1Y');

  const periods: TimePeriod[] = ['1M', '3M', 'FYTD', '6M', '1Y', '3Y', '5Y'];

  // Sample data - you can make this dynamic based on selectedPeriod
  const chartData = {
    labels: ['2024', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', '2025'],
    datasets: [
      {
        label: 'Market Value',
        data: [6200000, 6250000, 6300000, 6350000, 6400000, 6450000, 6500000, 6550000, 6600000, 6650000, 6700000, 6750000],
        borderColor: '#0062E1',
        backgroundColor: 'rgba(0, 98, 225, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#0062E1',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
      {
        label: 'Net Contributions',
        data: [5200000, 5250000, 5300000, 5350000, 5400000, 5450000, 5500000, 5520000, 5540000, 5560000, 5580000, 5600000],
        borderColor: '#1A314D',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        fill: false,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#1A314D',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
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
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += 'R ' + context.parsed.y.toLocaleString();
            return label;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
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
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="text-base md:text-lg font-medium text-gray-900">
          Market Value vs Net Contributions
        </h3>
        
        {/* Time Period Buttons */}
        <div className="flex flex-wrap gap-1">
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
      
      <div className="h-64 md:h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MarketValueChart;
