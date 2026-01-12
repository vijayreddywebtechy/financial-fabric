'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CashAvailabilityChart: React.FC = () => {
  const chartData = {
    labels: ['Immediate', 'Restricted', 'Locked'],
    datasets: [
      {
        data: [1000000, 2800000, 3000000],
        backgroundColor: [
          '#10b981', // Green for Immediate
          '#f97316', // Orange for Restricted
          '#ef4444', // Red for Locked
        ],
        borderRadius: 8,
        barThickness: 80,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return 'R ' + context.parsed.y.toLocaleString();
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 3500000,
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
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Cash Availability
      </h3>
      
      <div className="h-80">
        <Bar data={chartData} options={options} />
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 italic">
          How quickly can I access my money?
        </p>
      </div>
    </div>
  );
};

export default CashAvailabilityChart;
