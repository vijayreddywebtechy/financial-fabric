"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomSelect, { SelectOption } from "@/components/dynamic/CustomSelect";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";
import ContextSummaryBar from "./blocks/ContextSummaryBar";

interface FormData {
  targetGoal: number;
  currentAge: number;
  retireAge: number;
  currentContribution: number;
  newContribution: number;
  inflation: number;
  escalation: number;
  projectedGrowth: number;
  strategyReturn: string;
}

export default function GapAnalysis() {
  const [viewMode, setViewMode] = useState<"today" | "future">("today");
  const [formData, setFormData] = useState<FormData>({
    targetGoal: 5000000,
    currentAge: 32,
    retireAge: 65,
    currentContribution: 2500,
    newContribution: 7500,
    inflation: 6.0,
    escalation: 6.0,
    projectedGrowth: 13.0,
    strategyReturn: "aggressive",
  });

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const strategyOptions: SelectOption[] = [
    { value: "conservative", label: "Conservative (CPI+3)" },
    { value: "moderate", label: "Moderate (CPI+5)" },
    { value: "aggressive", label: "Aggressive (CPI+7)" },
  ];

  const [selectedStrategy, setSelectedStrategy] = useState<SelectOption | null>(
    strategyOptions.find((opt) => opt.value === formData.strategyReturn) ||
      strategyOptions[2]
  );

  // Calculate projections
  const lumpSumGrowth = 4130000;
  const currentPremiums = 3290000;
  const newStrategy = 9880000;
  const totalProjected = lumpSumGrowth + currentPremiums + newStrategy;
  const surplusUsedPercent = (formData.newContribution / 15000) * 100;

  useEffect(() => {
    // Register Chart.js components
    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
      BarController
    );

    if (!chartRef.current) return;

    // Destroy existing chart
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstanceRef.current = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: ["Current Trajectory", "With Advice", "Target Goal"],
        datasets: [
          {
            label: "Lump Sum Growth",
            data: [4130000, 4130000, 0],
            backgroundColor: "#93C5FD",
            stack: "Stack0",
          },
          {
            label: "Current Premiums",
            data: [3290000, 3290000, 0],
            backgroundColor: "#3B82F6",
            stack: "Stack0",
          },
          {
            label: "New Strategy",
            data: [0, 9880000, 0],
            backgroundColor: "#22C55E",
            stack: "Stack0",
          },
          {
            label: "Target",
            data: [0, 0, formData.targetGoal],
            backgroundColor: "#D1D5DB",
            stack: "Stack1",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                let label = context.dataset.label || "";
                if (label) {
                  label += ": ";
                }
                if (context.parsed.y !== null) {
                  label += "R " + context.parsed.y.toLocaleString("en-ZA");
                }
                return label;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value: any) {
                return "R " + value / 1000000 + "M";
              },
            },
            grid: {
              color: "#F3F4F6",
            },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [formData.targetGoal]);

  const formatCurrency = (value: number) => {
    return (value / 1000000).toFixed(2) + "M";
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className=" bg-gray-50 p-4 sm:p-8">
      <ContextSummaryBar />

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
        {/* Title and Toggle */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium mb-1">
              Gap Analysis
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Projected Wealth vs. Target Goal
            </p>
          </div>
          <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => setViewMode("today")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                viewMode === "today"
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Today's Value
            </button>
            <button
              onClick={() => setViewMode("future")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                viewMode === "future"
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Future Value
            </button>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Target Goal */}
            <div>
              <Label htmlFor="targetGoal" className="mb-2 block">
                Target Goal
              </Label>
              <Input
                id="targetGoal"
                type="text"
                value={`R${formData.targetGoal.toLocaleString("en-ZA")}`}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  handleInputChange("targetGoal", parseInt(value) || 0);
                }}
                className="text-base"
              />
            </div>

            {/* Age */}
            <div>
              <Label className="mb-2 block">Age (Current / Retire)</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={formData.currentAge}
                  onChange={(e) =>
                    handleInputChange(
                      "currentAge",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="text-base"
                />
                <Input
                  type="number"
                  value={formData.retireAge}
                  onChange={(e) =>
                    handleInputChange(
                      "retireAge",
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="text-base"
                />
              </div>
            </div>

            {/* Strategy Return */}
            <div>
              <Label className="mb-2 block">Strategy Return</Label>
              <CustomSelect
                options={strategyOptions}
                value={selectedStrategy}
                onChange={(newValue) => {
                  setSelectedStrategy(newValue);
                  if (newValue) {
                    handleInputChange("strategyReturn", newValue.value);
                  }
                }}
                placeholder="Select strategy"
              />
            </div>

            {/* Current Contribution */}
            <div>
              <Label htmlFor="currentContribution" className="mb-2 block">
                Current Contribution
              </Label>
              <Input
                id="currentContribution"
                type="text"
                value={`R${formData.currentContribution}`}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  handleInputChange(
                    "currentContribution",
                    parseInt(value) || 0
                  );
                }}
                className="text-base"
              />
            </div>

            {/* Inflation */}
            <div>
              <Label htmlFor="inflation" className="mb-2 block">
                Inflation (CPI)
              </Label>
              <div className="relative">
                <Input
                  id="inflation"
                  type="number"
                  step="0.1"
                  value={formData.inflation}
                  onChange={(e) =>
                    handleInputChange(
                      "inflation",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="text-base pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>

            {/* Projected Growth */}
            <div>
              <Label htmlFor="projectedGrowth" className="mb-2 block">
                Projected Growth
              </Label>
              <div className="relative">
                <Input
                  id="projectedGrowth"
                  type="number"
                  step="0.1"
                  value={formData.projectedGrowth}
                  onChange={(e) =>
                    handleInputChange(
                      "projectedGrowth",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="text-base pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>

            {/* New Contribution */}
            <div>
              <Label htmlFor="newContribution" className="mb-2 block">
                New Contribution
              </Label>
              <Input
                id="newContribution"
                type="text"
                value={`R${formData.newContribution}`}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  handleInputChange("newContribution", parseInt(value) || 0);
                }}
                className="text-base border-2 border-green-500 bg-green-50"
              />
              <p className="text-xs text-green-600 mt-1 font-medium">
                {surplusUsedPercent.toFixed(0)}% of Surplus Used
              </p>
            </div>

            {/* Escalation */}
            <div>
              <Label htmlFor="escalation" className="mb-2 block">
                Escalation
              </Label>
              <div className="relative">
                <Input
                  id="escalation"
                  type="number"
                  step="0.1"
                  value={formData.escalation}
                  onChange={(e) =>
                    handleInputChange(
                      "escalation",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="text-base pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chart and Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2">
            <div style={{ height: "400px", position: "relative" }}>
              <canvas ref={chartRef}></canvas>
            </div>
          </div>

          {/* Projected Breakdown */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Projected Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-200 rounded"></div>
                  <span className="text-sm text-gray-700">Lump Sum Growth</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  R {formatCurrency(lumpSumGrowth)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-700">
                    Current Premiums
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  R {formatCurrency(currentPremiums)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-700">New Strategy</span>
                </div>
                <span className="text-sm font-medium text-green-600">
                  R {formatCurrency(newStrategy)}
                </span>
              </div>

              {/* Final Status */}
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mt-6">
                <p className="text-xs text-green-700 font-medium mb-1">
                  FINAL STATUS
                </p>
                <p className="text-2xl font-bold text-green-700">Goal Met</p>
              </div>

              {/* Totals */}
              <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Total Projected</span>
                  <span className="text-lg font-bold text-blue-600">
                    R {formatCurrency(totalProjected)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Target Goal</span>
                  <span className="text-lg font-bold text-gray-900">
                    R {formatCurrency(formData.targetGoal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
