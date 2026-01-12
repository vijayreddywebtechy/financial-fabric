"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface NeedAnalysis {
  title: string;
  required: string;
  provided: string;
  shortfall: string;
  requiredValue: number;
  providedValue: number;
  shortfallValue: number;
}

const GaugeChart: React.FC<{ analysis: NeedAnalysis }> = ({ analysis }) => {
  const total = analysis.requiredValue;
  const providedPercentage = (analysis.providedValue / total) * 100;
  const shortfallPercentage = (analysis.shortfallValue / total) * 100;

  const data = {
    datasets: [
      {
        data: [providedPercentage, shortfallPercentage],
        backgroundColor: ["#FF8C00", "#E5E7EB"],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    cutout: "60%",
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <h4 className="text-base font-medium text-gray-900 mb-4">
        {analysis.title}
      </h4>
      <div className="relative w-full h-56 flex justify-center">
        <Doughnut data={data} options={options} />
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Required</span>
          <span className="text-gray-900">{analysis.required}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Provided</span>
          <span className="text-gray-900">{analysis.provided}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-200">
          <span className="text-red-600">Shortfall</span>
          <span className="text-red-600">{analysis.shortfall}</span>
        </div>
      </div>
    </div>
  );
};

const FinancialNeedsAnalysis = () => {
  const analyses: NeedAnalysis[] = [
    {
      title: "Permanent Disability",
      required: "R 1,500,000",
      provided: "R 1,076,891",
      shortfall: "R 423,100",
      requiredValue: 1500000,
      providedValue: 1076891,
      shortfallValue: 423100,
    },
    {
      title: "Income Disability",
      required: "R 60,827 pm",
      provided: "R 30,702 pm",
      shortfall: "R 30,125 pm",
      requiredValue: 60827,
      providedValue: 30702,
      shortfallValue: 30125,
    },
    {
      title: "Dread Disease",
      required: "R 860,000",
      provided: "R 107,689",
      shortfall: "R 692,311",
      requiredValue: 860000,
      providedValue: 107689,
      shortfallValue: 692311,
    },
  ];

  return (
    <div className="mb-6 md:mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Financial Needs Analysis
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analyses.map((analysis, index) => (
          <GaugeChart key={index} analysis={analysis} />
        ))}
      </div>
    </div>
  );
};

export default FinancialNeedsAnalysis;
