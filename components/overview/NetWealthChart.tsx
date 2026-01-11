'use client';

import React from 'react';
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

// Register ChartJS components
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

const NetWealthChart: React.FC = () => {
  const lineChartData = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [
      {
        label: 'Net Wealth',
        data: [5800000, 6000000, 6250000, 6450000, 6650000, 6800000],
        borderColor: '#1e40af',
        backgroundColor: 'rgba(30, 64, 175, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#1e40af',
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        align: 'center' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 5600000,
        max: 6900000,
        ticks: {
          callback: (value: string | number) => {
            return (Number(value) / 1000000).toFixed(1) + 'M';
          },
        },
      },
    },
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        5-Year Net Wealth Growth (Simulated)
      </h3>
      <div className="h-80">
        <Line data={lineChartData} options={lineChartOptions} />
      </div>
    </div>
  );
};

export default NetWealthChart;
