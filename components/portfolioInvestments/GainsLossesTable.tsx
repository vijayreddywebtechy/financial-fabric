'use client';

import React, { useState } from 'react';

type TabType = 'Unrealised' | 'Realised' | 'Total';

interface Investment {
  account: string;
  bookValue: string;
  marketValue: string;
  gainLossR: string;
  gainLossPercent: string;
  isPositive: boolean;
}

const GainsLossesTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Unrealised');

  const investments: Investment[] = [
    {
      account: 'Standard Bank Pension Fund',
      bookValue: 'R 1,308,262',
      marketValue: 'R 2,000,000',
      gainLossR: 'R 691,738',
      gainLossPercent: '52.87%',
      isPositive: true,
    },
    {
      account: 'Retirement Annuity Fund',
      bookValue: 'R 650,606',
      marketValue: 'R 1,000,000',
      gainLossR: 'R 349,394',
      gainLossPercent: '53.70%',
      isPositive: true,
    },
    {
      account: 'Tax Free Savings Account',
      bookValue: 'R 160,901',
      marketValue: 'R 300,000',
      gainLossR: 'R 139,099',
      gainLossPercent: '86.45%',
      isPositive: true,
    },
    {
      account: 'International Endowment',
      bookValue: 'R 285,703',
      marketValue: 'R 500,000',
      gainLossR: 'R 214,297',
      gainLossPercent: '75.01%',
      isPositive: true,
    },
    {
      account: 'Direct Unit Trust Investment',
      bookValue: 'R 672,746',
      marketValue: 'R 1,000,000',
      gainLossR: 'R 327,254',
      gainLossPercent: '48.64%',
      isPositive: true,
    },
    {
      account: 'Direct Equity Investment',
      bookValue: 'R 447,344',
      marketValue: 'R 1,000,000',
      gainLossR: 'R 552,656',
      gainLossPercent: '123.54%',
      isPositive: true,
    },
    {
      account: 'Bank Deposit',
      bookValue: 'R 729,796',
      marketValue: 'R 1,000,000',
      gainLossR: 'R 270,204',
      gainLossPercent: '37.02%',
      isPositive: true,
    },
  ];

  const total = {
    bookValue: 'R 4,255,358',
    marketValue: 'R 6,800,000',
    gainLossR: 'R 2,544,642',
    gainLossPercent: '59.80%',
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Gains / Losses
      </h3>
      
      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {(['Unrealised', 'Realised', 'Total'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              pb-2 px-1 text-sm font-medium transition-colors border-b-2
              ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-700">Account</th>
              <th className="text-right py-3 px-2 font-medium text-gray-700">Book Value</th>
              <th className="text-right py-3 px-2 font-medium text-gray-700">Market Value</th>
              <th className="text-right py-3 px-2 font-medium text-gray-700">Gain/Loss (R)</th>
              <th className="text-right py-3 px-2 font-medium text-gray-700">Gain/Loss (%)</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2 text-gray-900">{investment.account}</td>
                <td className="py-3 px-2 text-right text-gray-700">{investment.bookValue}</td>
                <td className="py-3 px-2 text-right text-gray-700">{investment.marketValue}</td>
                <td className={`py-3 px-2 text-right ${investment.isPositive ? 'text-green-800' : 'text-red-600'}`}>
                  {investment.gainLossR}
                </td>
                <td className={`py-3 px-2 text-right ${investment.isPositive ? 'text-green-800' : 'text-red-600'}`}>
                  {investment.gainLossPercent}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-medium">
              <td className="py-3 px-2 text-gray-900">TOTAL</td>
              <td className="py-3 px-2 text-right text-gray-900">{total.bookValue}</td>
              <td className="py-3 px-2 text-right text-gray-900">{total.marketValue}</td>
              <td className="py-3 px-2 text-right text-green-800">{total.gainLossR}</td>
              <td className="py-3 px-2 text-right text-green-800">{total.gainLossPercent}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GainsLossesTable;
