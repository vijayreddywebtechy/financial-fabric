"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CashFlowPieChart: React.FC = () => {
  const chartData = {
    labels: ["Net Invested Capital", "Investment Growth"],
    datasets: [
      {
        data: [4255358, 2544642],
        backgroundColor: ["#9ca3af", "#10b981"],
        borderWidth: 0,
        cutout: "0%",
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
          label: function (context: any) {
            const label = context.label || "";
            const value = context.parsed;
            return label + ": R " + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Cash Flow</h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Net Invested</p>
          <p className="text-lg font-medium text-gray-900">R 4,255,358</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Growth</p>
          <p className="text-lg font-medium text-green-600">+ R 2,544,642</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="h-64 flex items-center justify-center mb-4">
        <div className="relative w-full max-w-xs">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-gray-400 rounded-sm"></span>
            <span className="text-sm text-gray-700">Net Invested Capital</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-600 rounded-sm"></span>
            <span className="text-sm text-gray-700">Investment Growth</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlowPieChart;
