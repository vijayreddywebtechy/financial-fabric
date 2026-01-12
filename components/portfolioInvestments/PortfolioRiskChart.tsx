"use client";

import React, { useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PortfolioRiskChart = () => {
  const [activeFilter, setActiveFilter] = useState("3Y");

  const filters = ["1M", "3M", "FYTD", "6M", "1Y", "3Y", "5Y"];

  const portfolioData = {
    datasets: [
      {
        label: "SB Pension (29%)",
        data: [{ x: 22, y: 17 }],
        backgroundColor: "#003FCA",
        pointRadius: 8,
      },
      {
        label: "Stanlib RA (15%)",
        data: [{ x: 14, y: 10 }],
        backgroundColor: "#0062E1",
        pointRadius: 8,
      },
      {
        label: "TFSA (4%)",
        data: [{ x: 21, y: 10 }],
        backgroundColor: "#A78BFA",
        pointRadius: 8,
      },
      {
        label: "Endowment (7%)",
        data: [{ x: 18, y: 7 }],
        backgroundColor: "#E879F9",
        pointRadius: 8,
      },
      {
        label: "Unit Trust (15%)",
        data: [{ x: 22, y: 8 }],
        backgroundColor: "#DB2777",
        pointRadius: 8,
      },
      {
        label: "Shyft Shares (15%)",
        data: [{ x: 15, y: 8 }],
        backgroundColor: "#1E40AF",
        pointRadius: 8,
      },
      {
        label: "Cash (15%)",
        data: [{ x: 2, y: 6.5 }],
        backgroundColor: "#10B981",
        pointRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: Risk ${context.parsed.x}, Return ${context.parsed.y}%`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear" as const,
        position: "bottom" as const,
        title: {
          display: true,
          text: "Risk",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#E5E7EB",
        },
        ticks: {
          stepSize: 2,
        },
      },
      y: {
        title: {
          display: true,
          text: "Return",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#E5E7EB",
        },
        ticks: {
          stepSize: 2,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Portfolio Risk vs Market
        </h3>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 text-sm font-medium rounded border transition-colors ${
                activeFilter === filter
                  ? "bg-[#003FCA] text-white border-[#003FCA]"
                  : "bg-white text-gray-700 border-gray-300 hover:border-[#003FCA] hover:text-[#003FCA]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="h-80">
        <Scatter data={portfolioData} options={options} />
      </div>
    </div>
  );
};

export default PortfolioRiskChart;
