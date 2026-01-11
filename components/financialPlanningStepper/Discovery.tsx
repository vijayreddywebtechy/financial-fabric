import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ContextSummaryBar from "./blocks/ContextSummaryBar";

interface Asset {
  id: string;
  name: string;
  type: string;
  value: number;
  selected: boolean;
}

export default function Discovery() {
  const [netMonthlyIncome, setNetMonthlyIncome] = useState(91200);
  const [monthlyExpenses, setMonthlyExpenses] = useState(76200);

  const [assets, setAssets] = useState<Asset[]>([
    {
      id: "1",
      name: "Discovery RA",
      type: "Locked",
      value: 350000,
      selected: true,
    },
    {
      id: "2",
      name: "Allan Gray Equity",
      type: "Liquid",
      value: 150000,
      selected: true,
    },
  ]);

  const investableSurplus = netMonthlyIncome - monthlyExpenses;
  const totalCapital = assets.reduce(
    (sum, asset) => sum + (asset.selected ? asset.value : 0),
    0
  );

  const handleAssetToggle = (id: string) => {
    setAssets((prev) =>
      prev.map((asset) =>
        asset.id === id ? { ...asset, selected: !asset.selected } : asset
      )
    );
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-ZA");
  };

  return (
    <div className="bg-white border border-gray-200 p-4 sm:p-6 md:p-8 rounded shadow">
      <ContextSummaryBar />

      {/* Sync Notice */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        <span>Data synced from Financial Analysis</span>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 sm:p-8">
        {/* Title Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium mb-1">
              Discovery
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Financial Diagnostic
            </p>
          </div>
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md text-sm font-medium">
            Synced from Financial Analysis
          </span>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 1. Cash Flow */}
          <div>
            <h2 className="text-xl font-medium text-blue-600 mb-6">
              1. Cash Flow
            </h2>

            <div className="space-y-4">
              {/* Net Monthly Income */}
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">Net Monthly Income</span>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded px-3 py-2">
                  <span className="text-gray-600">R</span>
                  <span className="text-gray-900 min-w-[80px] text-right">
                    {formatCurrency(netMonthlyIncome)}
                  </span>
                </div>
              </div>

              {/* Monthly Expenses */}
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-700">Monthly Expenses</span>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded px-3 py-2">
                  <span className="text-gray-600">R</span>
                  <span className="text-gray-900 min-w-[80px] text-right">
                    {formatCurrency(monthlyExpenses)}
                  </span>
                </div>
              </div>

              {/* Investable Surplus */}
              <div className="flex justify-between items-center py-3 mt-6">
                <span className="text-green-700 font-medium">
                  Investable Surplus
                </span>
                <div className="flex items-center gap-2 bg-green-50 border-2 border-green-500 rounded px-3 py-2">
                  <span className="text-green-700 font-medium">R</span>
                  <span className="text-green-700 font-medium min-w-[80px] text-right">
                    {formatCurrency(investableSurplus)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Existing Assets */}
          <div>
            <h2 className="text-xl font-medium text-blue-600 mb-6">
              2. Existing Assets
            </h2>

            {/* Assets Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                      Select
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">
                      Asset
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-gray-700 text-sm">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset) => (
                    <tr key={asset.id} className="border-t border-gray-200">
                      <td className="py-4 px-4">
                        <Checkbox
                          checked={asset.selected}
                          onCheckedChange={() => handleAssetToggle(asset.id)}
                          className="h-5 w-5"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="text-sm text-gray-900 font-medium">
                            {asset.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {asset.type}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right text-sm text-gray-900">
                        R {formatCurrency(asset.value)}
                      </td>
                    </tr>
                  ))}

                  {/* Total Capital Row */}
                  <tr className="border-t border-gray-300 bg-gray-100">
                    <td className="py-4 px-4"></td>
                    <td className="py-4 px-4">
                      <div className="text-gray-900 font-medium text-base">
                        Total Capital
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right text-gray-900 font-medium text-base">
                      R {formatCurrency(totalCapital)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
