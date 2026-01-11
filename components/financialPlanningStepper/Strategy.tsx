import React, { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import CustomSelect, { SelectOption } from "@/components/dynamic/CustomSelect";
import ContextSummaryBar from "./blocks/ContextSummaryBar";
import { Label } from "../ui/label";

interface Fund {
  id: number;
  name: string;
  assetClass: string;
  risk: string;
  tic: string;
  yield: string;
  value: string;
  isRecommended?: boolean;
}

const StrategyComponent: React.FC = () => {
  const adviceTypeOptions: SelectOption[] = [
    { value: "new-investment", label: "New Investment" },
    { value: "existing-investment", label: "Existing Investment" },
    { value: "portfolio-review", label: "Portfolio Review" },
  ];

  const riskOverrideOptions: SelectOption[] = [
    { value: "conservative-low", label: "Conservative (Low)" },
    { value: "moderate-med", label: "Moderate (Med)" },
    { value: "aggressive-high", label: "Aggressive (High)" },
    { value: "very-aggressive", label: "Very Aggressive" },
  ];

  const [adviceType, setAdviceType] = useState<SelectOption | null>(
    adviceTypeOptions[0]
  );
  const [riskOverride, setRiskOverride] = useState<SelectOption | null>(
    riskOverrideOptions[2]
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFunds, setSelectedFunds] = useState<number[]>([0, 1, 2]);
  const [allocations, setAllocations] = useState<Record<number, number>>({
    0: 40,
    1: 40,
    2: 20,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
  });

  const [advisorFee, setAdvisorFee] = useState<string>("0.8");
  const [platformCost, setPlatformCost] = useState<string>("0.33");
  const [rationale, setRationale] = useState<string>(
    "Aggressive strategy maximizing equity exposure (Reg 28) for 33-year horizon."
  );
  const [alternatives, setAlternatives] = useState<Record<string, boolean>>({
    keepCurrent: false,
    increaseContributions: false,
    useDiscretionary: false,
  });

  const funds: Fund[] = [
    {
      id: 0,
      name: "Coronation Balanced Plus",
      assetClass: "Multi-Asset",
      risk: "Med-High",
      tic: "1.25%",
      yield: "2.1%",
      value: "R 3,000",
      isRecommended: true,
    },
    {
      id: 1,
      name: "Ninety One Opportunity",
      assetClass: "Multi-Asset",
      risk: "Med",
      tic: "1.15%",
      yield: "2.5%",
      value: "R 3,000",
      isRecommended: true,
    },
    {
      id: 2,
      name: "Standard Bank Money Market",
      assetClass: "Interest Bearing",
      risk: "Low",
      tic: "0.45%",
      yield: "7.1%",
      value: "R 1,500",
      isRecommended: true,
    },
    {
      id: 3,
      name: "Stanlib Global Select Feeder B2",
      assetClass: "Equity-Global",
      risk: "High",
      tic: "1.10%",
      yield: "0.0%",
      value: "R 0",
    },
    {
      id: 4,
      name: "Investec S&P 500 Index Feeder B1",
      assetClass: "Equity-Global",
      risk: "High",
      tic: "0.65%",
      yield: "0.0%",
      value: "R 0",
    },
    {
      id: 5,
      name: "SBFC Stable Fund",
      assetClass: "Multi-Asset",
      risk: "Low",
      tic: "0.95%",
      yield: "4.5%",
      value: "R 0",
    },
    {
      id: 6,
      name: "Allan Gray Equity Fund",
      assetClass: "Equity-Local",
      risk: "High",
      tic: "1.00%",
      yield: "1.5%",
      value: "R 0",
    },
    {
      id: 7,
      name: "ABSA SA Bond Index",
      assetClass: "Fixed Income",
      risk: "Low",
      tic: "0.20%",
      yield: "9.5%",
      value: "R 0",
    },
    {
      id: 8,
      name: "Sygnia Global Property REIT",
      assetClass: "Property",
      risk: "Med",
      tic: "0.80%",
      yield: "3.5%",
      value: "R 0",
    },
    {
      id: 9,
      name: "Vanguard Total World Stock",
      assetClass: "Equity-Global",
      risk: "High",
      tic: "0.15%",
      yield: "0.5%",
      value: "R 0",
    },
    {
      id: 10,
      name: "Satrix Global Emerging Markets",
      assetClass: "Equity-Global",
      risk: "Very High",
      tic: "0.16%",
      yield: "0.7%",
      value: "R 0",
    },
  ];

  const filteredFunds = useMemo(() => {
    return funds.filter(
      (fund) =>
        fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.assetClass.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const recommendedFunds = funds.filter((fund) => fund.isRecommended);

  const handleCheckboxChange = (fundId: number, checked: boolean) => {
    if (checked) {
      setSelectedFunds([...selectedFunds, fundId]);
    } else {
      setSelectedFunds(selectedFunds.filter((id) => id !== fundId));
      setAllocations((prev) => ({ ...prev, [fundId]: 0 }));
    }
  };

  const handleAllocationChange = (fundId: number, value: string) => {
    const numValue = parseInt(value) || 0;
    setAllocations((prev) => ({ ...prev, [fundId]: numValue }));
  };

  const totalAllocation = useMemo(() => {
    return Object.values(allocations).reduce((sum, val) => sum + val, 0);
  }, [allocations]);

  const totalValue = useMemo(() => {
    return selectedFunds.reduce((sum, fundId) => {
      const fund = funds.find((f) => f.id === fundId);
      const allocation = allocations[fundId] || 0;
      const value = parseInt(fund?.value.replace(/[R\s,]/g, "") || "0");
      return sum + (value * allocation) / 100;
    }, 0);
  }, [selectedFunds, allocations]);

  const weightedTIC = useMemo(() => {
    return selectedFunds.reduce((sum, fundId) => {
      const fund = funds.find((f) => f.id === fundId);
      const allocation = allocations[fundId] || 0;
      const tic = parseFloat(fund?.tic.replace("%", "") || "0");
      return sum + (tic * allocation) / 100;
    }, 0);
  }, [selectedFunds, allocations]);

  const totalEAC = useMemo(() => {
    const advisor = parseFloat(advisorFee) || 0;
    const platform = parseFloat(platformCost) || 0;
    return advisor + platform + weightedTIC;
  }, [advisorFee, platformCost, weightedTIC]);

  const handleAlternativeChange = (key: string, checked: boolean) => {
    setAlternatives((prev) => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="bg-white border border-gray-200 p-4 sm:p-6 md:p-8 rounded shadow">
      <ContextSummaryBar />
      <div className="pb-6 mb-6 border-b border-gray-200">
        <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium mb-1">
          Strategy
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Establish goals and risk capacity.
        </p>
      </div>
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <Label className="block mb-2">
            Advice Type
          </Label>
          <CustomSelect
            options={adviceTypeOptions}
            value={adviceType}
            onChange={(newValue) => setAdviceType(newValue)}
            placeholder="Select advice type"
          />
        </div>
        <div>
          <Label className="block mb-2">
            Risk Override
          </Label>
          <CustomSelect
            options={riskOverrideOptions}
            value={riskOverride}
            onChange={(newValue) => setRiskOverride(newValue)}
            placeholder="Select risk level"
          />
        </div>
      </div>

      {/* Recommended Products Section */}
      <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-green-900 pb-3 border-b border-green-200 mb-4">
          RECOMMENDED PRODUCTS (High Risk)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-medium text-gray-700 pb-2 pr-4">
                  Fund Name
                </th>
                <th className="text-left text-xs font-medium text-gray-700 pb-2 pr-4">
                  Asset Class
                </th>
                <th className="text-left text-xs font-medium text-gray-700 pb-2 pr-4">
                  Risk
                </th>
                <th className="text-left text-xs font-medium text-gray-700 pb-2 pr-4">
                  TIC
                </th>
                <th className="text-left text-xs font-medium text-gray-700 pb-2 pr-4">
                  Yield
                </th>
                <th className="text-left text-xs font-medium text-gray-700 pb-2 pr-4">
                  Alloc %
                </th>
                <th className="text-left text-xs font-medium text-gray-700 pb-2">
                  Value (R)
                </th>
              </tr>
            </thead>
            <tbody>
              {recommendedFunds.map((fund) => (
                <tr key={fund.id} className="border-b border-green-100">
                  <td className="py-3 pr-4 text-sm text-gray-900 font-medium">
                    {fund.name}
                  </td>
                  <td className="py-3 pr-4 text-sm text-gray-700">
                    {fund.assetClass}
                  </td>
                  <td className="py-3 pr-4 text-sm text-gray-700">
                    {fund.risk}
                  </td>
                  <td className="py-3 pr-4 text-sm text-gray-700">
                    {fund.tic}
                  </td>
                  <td className="py-3 pr-4 text-sm text-gray-700">
                    {fund.yield}
                  </td>
                  <td className="py-3 pr-4 text-sm text-gray-700">
                    {allocations[fund.id]}%
                  </td>
                  <td className="py-3 text-sm text-gray-900">{fund.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Funds
        </label>
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <Input
            type="text"
            placeholder="Search Fund Universe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Fund Selection Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left text-xs font-medium text-gray-700 p-3">
                Select
              </th>
              <th className="text-left text-xs font-medium text-gray-700 p-3">
                Fund Name
              </th>
              <th className="text-left text-xs font-medium text-gray-700 p-3">
                Asset Class
              </th>
              <th className="text-left text-xs font-medium text-gray-700 p-3">
                Risk
              </th>
              <th className="text-left text-xs font-medium text-gray-700 p-3">
                TIC
              </th>
              <th className="text-left text-xs font-medium text-gray-700 p-3">
                Yield
              </th>
              <th className="text-left text-xs font-medium text-gray-700 p-3">
                Alloc %
              </th>
              <th className="text-left text-xs font-medium text-gray-700 p-3">
                Value (R)
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFunds.map((fund, index) => (
              <tr
                key={fund.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b border-gray-200 hover:bg-blue-50 transition-colors`}
              >
                <td className="p-3">
                  <Checkbox
                    checked={selectedFunds.includes(fund.id)}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(fund.id, checked as boolean)
                    }
                  />
                </td>
                <td className="p-3 text-sm font-medium text-gray-900">
                  {fund.name}
                </td>
                <td className="p-3 text-sm text-gray-700">{fund.assetClass}</td>
                <td className="p-3 text-sm text-gray-700">{fund.risk}</td>
                <td className="p-3 text-sm text-gray-700">{fund.tic}</td>
                <td className="p-3 text-sm text-gray-700">{fund.yield}</td>
                <td className="p-3">
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={allocations[fund.id]}
                    onChange={(e) =>
                      handleAllocationChange(fund.id, e.target.value)
                    }
                    className="w-20 text-center"
                    disabled={!selectedFunds.includes(fund.id)}
                  />
                </td>
                <td className="p-3 text-sm text-gray-900">{fund.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Warning Message */}
      {totalAllocation > 100 && (
        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-yellow-400 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-yellow-800">
              Allocation must equal 100%
            </span>
          </div>
        </div>
      )}

      {/* Total Section */}
      <div className="mt-4 flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">
            TOTAL ALLOCATION
          </span>
          <span
            className={`text-lg font-bold ${
              totalAllocation === 100 ? "text-green-600" : "text-red-600"
            }`}
          >
            {totalAllocation}%
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">
            R {totalValue.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-8 border border-blue-200 rounded-lg p-4 md:p-6 bg-blue-50">
        <h2 className="text-lg font-medium text-blue-900 mb-4">
          Cost & Compliance
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Advisor Fee */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Advisor Fee (Ex VAT)
            </label>
            <div className="relative">
              <Input
                type="number"
                step="0.01"
                value={advisorFee}
                onChange={(e) => setAdvisorFee(e.target.value)}
                className="pr-8"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                %
              </span>
            </div>
          </div>

          {/* Platform Cost */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Platform Cost
            </label>
            <div className="relative">
              <Input
                type="number"
                step="0.01"
                value={platformCost}
                onChange={(e) => setPlatformCost(e.target.value)}
                className="pr-8"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                %
              </span>
            </div>
          </div>

          {/* Fund TIC */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Fund TIC (Weighted)
            </label>
            <div className="flex items-center bg-white border border-gray-500 rounded-lg px-3 py-2 h-12 text-gray-900 font-medium">
              {weightedTIC.toFixed(2)}%
            </div>
          </div>

          {/* Total EAC */}
          <div>
            <label className="block text-xs font-medium text-blue-700 mb-2">
              Total EAC
            </label>
            <div className="flex items-center bg-white border border-blue-500 rounded-lg px-3 py-2 h-12 text-blue-700 text-lg font-bold">
              {totalEAC.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Rationale Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rationale
          </label>
          <textarea
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Enter rationale for investment strategy..."
          />
        </div>

        {/* Alternatives Considered */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Alternatives Considered
          </label>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="keepCurrent"
                checked={alternatives.keepCurrent}
                onCheckedChange={(checked) =>
                  handleAlternativeChange("keepCurrent", checked as boolean)
                }
              />
              <label
                htmlFor="keepCurrent"
                className="text-sm text-gray-700 cursor-pointer select-none"
              >
                Keep current contributions only
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="increaseContributions"
                checked={alternatives.increaseContributions}
                onCheckedChange={(checked) =>
                  handleAlternativeChange(
                    "increaseContributions",
                    checked as boolean
                  )
                }
              />
              <label
                htmlFor="increaseContributions"
                className="text-sm text-gray-700 cursor-pointer select-none"
              >
                Increase contributions into existing RA only
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="useDiscretionary"
                checked={alternatives.useDiscretionary}
                onCheckedChange={(checked) =>
                  handleAlternativeChange(
                    "useDiscretionary",
                    checked as boolean
                  )
                }
              />
              <label
                htmlFor="useDiscretionary"
                className="text-sm text-gray-700 cursor-pointer select-none"
              >
                Use discretionary investment instead of retirement fund
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategyComponent;
