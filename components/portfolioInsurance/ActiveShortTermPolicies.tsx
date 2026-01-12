"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PolicyItem {
  description: string;
  details: string;
  replacementValue: string;
  premium: string;
}

interface Policy {
  policyName: string;
  insurer: string;
  policyNumber: string;
  excess: string;
  replacementValue: string;
  category: string;
  items?: PolicyItem[];
}

const ActiveShortTermPolicies = () => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const policies: Policy[] = [
    {
      policyName: "Santam Personal Policy",
      insurer: "Santam",
      policyNumber: "PL-998877",
      excess: "Var",
      replacementValue: "Aggregated",
      category: "Personal Lines",
      items: [
        {
          description: "Building (Centurion)",
          details: "45 Amberfield Valley",
          replacementValue: "R 2,500,000",
          premium: "R 450.00",
        },
        {
          description: "Household Contents",
          details: "General",
          replacementValue: "R 750,000",
          premium: "R 210.00",
        },
        {
          description: "Vehicle 1",
          details: "2022 Toyota Fortuner",
          replacementValue: "R 650,000",
          premium: "R 890.00",
        },
        {
          description: "All Risks",
          details: "Laptops, Jewelry",
          replacementValue: "R 120,000",
          premium: "R 150.00",
        },
      ],
    },
  ];

  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const calculateTotal = (items: PolicyItem[]) => {
    const totalValue = items.reduce((sum, item) => {
      const value = parseFloat(item.replacementValue.replace(/[R,\s]/g, ""));
      return sum + value;
    }, 0);
    const totalPremium = items.reduce((sum, item) => {
      const premium = parseFloat(item.premium.replace(/[R,\s]/g, ""));
      return sum + premium;
    }, 0);
    return {
      value: `R ${totalValue.toLocaleString()}`,
      premium: `R ${totalPremium.toFixed(2)}`,
    };
  };

  const groupedPolicies = policies.reduce((acc, policy) => {
    if (!acc[policy.category]) {
      acc[policy.category] = [];
    }
    acc[policy.category].push(policy);
    return acc;
  }, {} as Record<string, Policy[]>);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 mb-6 md:mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Active Short-Term Policies
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Insured Item / Description
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Insurer
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Policy Number
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Excess
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Replacement Value
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedPolicies).map(
              ([category, categoryPolicies]) => (
                <React.Fragment key={category}>
                  {/* Category Header */}
                  <tr className="bg-blue-50">
                    <td
                      colSpan={5}
                      className="py-2 px-4 font-medium text-primary-dark"
                    >
                      {category}
                    </td>
                  </tr>
                  {/* Policies in Category */}
                  {categoryPolicies.map((policy, index) => {
                    const globalIndex = policies.indexOf(policy);
                    const isExpanded = expandedRows.includes(globalIndex);
                    return (
                      <React.Fragment key={globalIndex}>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {policy.items && (
                                <button
                                  onClick={() => toggleRow(globalIndex)}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  {isExpanded ? (
                                    <ChevronDown
                                      className="h-5 w-5 text-primary-dark hover:bg-blue-200 rounded"
                                      strokeWidth={2}
                                    />
                                  ) : (
                                    <ChevronRight
                                      className="h-5 w-5 text-primary-dark hover:bg-blue-200 rounded"
                                      strokeWidth={2}
                                    />
                                  )}
                                </button>
                              )}
                              <span
                                className={`${
                                  policy.items
                                    ? "text-primary-dark cursor-pointer"
                                    : "text-gray-700"
                                }`}
                                onClick={() =>
                                  policy.items && toggleRow(globalIndex)
                                }
                              >
                                {policy.policyName}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {policy.insurer}
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {policy.policyNumber}
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {policy.excess}
                          </td>
                          <td className="py-3 px-4 text-gray-700 text-end">
                            {policy.replacementValue}
                          </td>
                        </tr>
                        {/* Expanded Details */}
                        {isExpanded && policy.items && (
                          <tr className="bg-gray-50">
                            <td colSpan={5} className="p-0">
                              <table className="w-full text-sm">
                                <tbody>
                                  {policy.items.map((item, itemIndex) => (
                                    <tr
                                      key={itemIndex}
                                      className="border-b border-gray-100"
                                    >
                                      <td className="py-3 px-4 pl-16 text-gray-900">
                                        {item.description}
                                      </td>

                                      <td className="py-3 px-4">
                                        {item.details}
                                      </td>
                                      <td className="py-3 px-4 text-gray-900">
                                        {item.replacementValue}
                                      </td>
                                      <td className="py-3 px-4 text-gray-700 text-end">
                                        {item.premium}
                                      </td>
                                    </tr>
                                  ))}
                                  {/* Total Row */}
                                  <tr className="bg-white border-b border-gray-200">
                                    <td className="py-3 px-4 pl-16 font-medium text-gray-900">
                                      Total
                                    </td>
                                    <td className="py-3 px-4"></td>

                                    <td className="py-3 px-4 font-medium text-gray-900">
                                      {calculateTotal(policy.items).value}
                                    </td>
                                    <td className="py-3 px-4 font-medium text-gray-900 text-end">
                                      {calculateTotal(policy.items).premium}
                                    </td>
                                  </tr>
                                  {/* View Schedule Button Row */}
                                  <tr className="bg-gray-50">
                                    <td colSpan={4} className="py-4 px-4">
                                      <div className="flex justify-end">
                                        <Button className="flex ml-auto uppercase" size="sm">
                                          View Schedule
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveShortTermPolicies;
