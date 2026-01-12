"use client";

import React from "react";

interface Currency {
  code: string;
  percentage: number;
  amount: string;
  color: string;
}

const CurrencyAllocation: React.FC = () => {
  const currencies: Currency[] = [
    { code: "ZAR", percentage: 64, amount: "R 4.35m", color: "bg-blue-900" },
    { code: "USD", percentage: 25, amount: "R 1.68m", color: "bg-orange-500" },
    { code: "GBP", percentage: 3, amount: "R 0.20m", color: "bg-purple-600" },
    { code: "EUR", percentage: 8, amount: "R 0.52m", color: "bg-purple-400" },
    { code: "CNY", percentage: 1, amount: "R 0.08m", color: "bg-pink-400" },
  ];

  const totalValue = "R 6 800 000.00";

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Currency Allocation
      </h3>

      {/* Total Value */}
      <div className="text-center mb-6">
        <p className="text-3xl font-bold text-gray-900">{totalValue}</p>
      </div>

      {/* Horizontal Bar */}
      <div className="flex h-12 rounded-lg overflow-hidden mb-6">
        {currencies.map((currency, index) => (
          <div
            key={index}
            className={`${currency.color} transition-all hover:opacity-80`}
            style={{ width: `${currency.percentage}%` }}
            title={`${currency.code}: ${currency.percentage}%`}
          ></div>
        ))}
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {currencies.map((currency, index) => (
          <div
            key={index}
            className="text-center border border-gray-200 rounded-lg p-3 shadow-sm"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className={`w-3 h-3 ${currency.color} rounded-full`}></span>
              <span className="text-xs font-medium text-gray-700">
                {currency.code}
              </span>
            </div>
            <p className="text-base font-medium text-gray-800">
              {currency.percentage}%
            </p>
            <p className="text-xs text-gray-600">{currency.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyAllocation;
