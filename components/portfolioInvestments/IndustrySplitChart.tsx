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

const IndustrySplitChart: React.FC = () => {
  const chartData = {
    labels: ['Tech', 'Finance', 'Resources', 'Prop', 'Ind'],
    datasets: [
      {
        data: [28, 24, 20, 15, 13],
        backgroundColor: [
          '#1e3a8a',
          '#7c3aed',
          '#ec4899',
          '#be185d',
          '#1e40af',
        ],
        borderRadius: 4,
        barThickness: 30,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return context.parsed.x + '%';
          }
        }
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 30,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          display: true,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Total Industry Split
      </h3>
      
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default IndustrySplitChart;
