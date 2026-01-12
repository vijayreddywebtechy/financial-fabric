"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Holding {
  account: string;
  accountNumber: string;
  provider: string;
  domicileCountry: string;
  platform: string;
  investmentValue: string;
  cash: string;
  totalValue: string;
  category: string;
  details?: {
    fundBasics: {
      underlying: string;
      reg28: string;
      type: string;
    };
    costBreakdown: {
      invMgmt: string;
      advice: string;
      adminPlatform: string;
      totalEAC: string;
    };
    twoPot: {
      savingsPot: { amount: string; status: string };
      retirementPot: { amount: string; status: string };
      vestedPot: { amount: string };
      totalValue: string;
    };
  };
}

const DetailedPortfolioHoldings = () => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const holdings: Holding[] = [
    {
      account: "Standard Bank Pension Fund",
      accountNumber: "SB-PEN-001",
      provider: "Standard Bank",
      domicileCountry: "South Africa",
      platform: "Alex Forbes",
      investmentValue: "R 2,000,000",
      cash: "R 0",
      totalValue: "R 2,000,000",
      category: "Retirement Funds",
      details: {
        fundBasics: {
          underlying: "Alex Forbes Performer",
          reg28: "Compliant",
          type: "Employer Pension",
        },
        costBreakdown: {
          invMgmt: "0.65%",
          advice: "0.50%",
          adminPlatform: "0.25%",
          totalEAC: "1.40%",
        },
        twoPot: {
          savingsPot: { amount: "R 30,000", status: "Accessible" },
          retirementPot: { amount: "R 20,000", status: "Locked" },
          vestedPot: { amount: "R 1,950,000" },
          totalValue: "R 2,000,000",
        },
      },
    },
    {
      account: "Retirement Annuity Fund",
      accountNumber: "SL-RA-882",
      provider: "Stanlib",
      domicileCountry: "South Africa",
      platform: "INN8",
      investmentValue: "R 1,000,000",
      cash: "R 0",
      totalValue: "R 1,000,000",
      category: "Retirement Funds",
    },
    {
      account: "Tax Free Savings Account",
      accountNumber: "SL-TFSA-09",
      provider: "Stanlib",
      domicileCountry: "South Africa",
      platform: "INN8",
      investmentValue: "R 300,000",
      cash: "R 0",
      totalValue: "R 300,000",
      category: "Investments",
    },
    {
      account: "International Endowment",
      accountNumber: "KANE-JE-001",
      provider: "SB Offshore",
      domicileCountry: "Jersey",
      platform: "Kane",
      investmentValue: "R 500,000",
      cash: "R 0",
      totalValue: "R 500,000",
      category: "Investments",
    },
    {
      account: "Direct Unit Trust Investment",
      accountNumber: "SL-UT-554",
      provider: "Stanlib",
      domicileCountry: "South Africa",
      platform: "INN8",
      investmentValue: "R 1,000,000",
      cash: "R 0",
      totalValue: "R 1,000,000",
      category: "Investments",
    },
    {
      account: "Direct Equity Investment",
      accountNumber: "SHYFTUS-01",
      provider: "Standard Bank",
      domicileCountry: "South Africa",
      platform: "Shyft",
      investmentValue: "R 1,000,000",
      cash: "R 0",
      totalValue: "R 1,000,000",
      category: "Investments",
    },
    {
      account: "Bank Deposit",
      accountNumber: "ACC-998877",
      provider: "Standard Bank",
      domicileCountry: "South Africa",
      platform: "-",
      investmentValue: "R 0",
      cash: "R 1,000,000",
      totalValue: "R 1,000,000",
      category: "Liquid Capital",
    },
  ];

  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const groupedHoldings = holdings.reduce((acc, holding) => {
    if (!acc[holding.category]) {
      acc[holding.category] = [];
    }
    acc[holding.category].push(holding);
    return acc;
  }, {} as Record<string, Holding[]>);

  const getCategoryTotal = (category: string) => {
    return groupedHoldings[category].reduce((sum, holding) => {
      const value = parseFloat(
        holding.totalValue.replace(/[R,\s]/g, "")
      );
      return sum + value;
    }, 0);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Detailed Portfolio Holdings
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Account
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Account Number
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Provider
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Domicile Country
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Platform
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Investment Value
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Cash
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Total Value
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedHoldings).map(([category, categoryHoldings]) => (
              <React.Fragment key={category}>
                {/* Category Header */}
                <tr className="bg-blue-50">
                  <td
                    colSpan={8}
                    className="py-2 px-4 font-medium text-primary-dark"
                  >
                    {category}
                    <span className="ml-4 text-sm">
                      R {getCategoryTotal(category).toLocaleString()}
                    </span>
                  </td>
                </tr>
                {/* Holdings in Category */}
                {categoryHoldings.map((holding, index) => {
                  const globalIndex = holdings.indexOf(holding);
                  const isExpanded = expandedRows.includes(globalIndex);
                  return (
                    <React.Fragment key={globalIndex}>
                      <tr className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {holding.details && (
                              <button
                                onClick={() => toggleRow(globalIndex)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                {isExpanded ? (
                                  <ChevronDown className="h-5 w-5 text-primary-dark hover:bg-blue-200 rounded" strokeWidth={2} />
                                ) : (
                                  <ChevronRight className="h-5 w-5 text-primary-dark hover:bg-blue-200 rounded" strokeWidth={2} />
                                )}
                              </button>
                            )}
                            <span
                              className={`${
                                holding.details
                                  ? "text-primary-dark"
                                  : "text-gray-700"
                              }`}
                            >
                              {holding.account}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {holding.accountNumber}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {holding.provider}
                        </td>
                        <td className="py-3 px-4 text-primary-dark">
                          {holding.domicileCountry}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {holding.platform}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {holding.investmentValue}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {holding.cash}
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900">
                          {holding.totalValue}
                        </td>
                      </tr>
                      {/* Expanded Details */}
                      {isExpanded && holding.details && (
                        <tr className="bg-gray-50">
                          <td colSpan={8} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {/* Fund Basics */}
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Fund Basics
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Underlying
                                    </span>
                                    <span className="font-medium text-gray-900">
                                      {holding.details.fundBasics.underlying}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Reg 28</span>
                                    <span className="font-medium text-gray-900">
                                      {holding.details.fundBasics.reg28}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Type</span>
                                    <span className="font-medium text-gray-900">
                                      {holding.details.fundBasics.type}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Cost Breakdown */}
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Cost Breakdown (Annual)
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Inv. Mgmt
                                    </span>
                                    <span className="text-gray-700">
                                      {holding.details.costBreakdown.invMgmt}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Advice</span>
                                    <span className="text-gray-700">
                                      {holding.details.costBreakdown.advice}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Admin/Platform
                                    </span>
                                    <span className="text-gray-700">
                                      {
                                        holding.details.costBreakdown
                                          .adminPlatform
                                      }
                                    </span>
                                  </div>
                                  <div className="flex justify-between pt-2 border-t border-gray-200">
                                    <span className="text-gray-900 font-medium">
                                      Total EAC
                                    </span>
                                    <span className="text-gray-900 font-medium">
                                      {holding.details.costBreakdown.totalEAC}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Two-Pot Components */}
                              <div>
                                <h4 className="font-medium text-gray-900 mb-3">
                                  Two-Pot Components
                                </h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Savings Pot{" "}
                                      <span className="text-green-600 text-xs">
                                        {holding.details.twoPot.savingsPot.status}
                                      </span>
                                    </span>
                                    <span className="text-gray-700">
                                      {holding.details.twoPot.savingsPot.amount}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Retirement Pot{" "}
                                      <span className="text-red-600 text-xs">
                                        {
                                          holding.details.twoPot.retirementPot
                                            .status
                                        }
                                      </span>
                                    </span>
                                    <span className="text-gray-700">
                                      {
                                        holding.details.twoPot.retirementPot
                                          .amount
                                      }
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">
                                      Vested Pot (Pre-2024)
                                    </span>
                                    <span className="text-gray-700">
                                      {holding.details.twoPot.vestedPot.amount}
                                    </span>
                                  </div>
                                  <div className="flex justify-between pt-2 border-t border-gray-200">
                                    <span className="text-gray-900 font-medium">
                                      Total Value
                                    </span>
                                    <span className="text-[#003FCA] font-medium">
                                      {holding.details.twoPot.totalValue}
                                    </span>
                                  </div>
                                </div>
                                <Button className="mt-4 min-w-auto ml-auto flex" size="sm">
                                  VIEW DETAILS
                                </Button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailedPortfolioHoldings;
