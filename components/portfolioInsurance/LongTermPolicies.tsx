"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Policy {
  policyName: string;
  type: string;
  provider: string;
  contractNumber: string;
  coverAmount: string;
  details?: {
    policyBenefits: {
      lifeCover?: string;
      capitalDisability?: string;
      dreadDisease?: string;
      downloadSchedule?: boolean;
    };
    policyDetails: {
      inceptionDate: string;
      premium: string;
      status: string;
    };
  };
}

const LongTermPolicies = () => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const policies: Policy[] = [
    {
      policyName: "Liberty Lifestyle Protector",
      type: "Life & Risk",
      provider: "Liberty",
      contractNumber: "5676691470D",
      coverAmount: "R 3,939,570",
      details: {
        policyBenefits: {
          lifeCover: "R 3,939,570",
          capitalDisability: "R 1,076,891",
          dreadDisease: "R 107,689",
          downloadSchedule: true,
        },
        policyDetails: {
          inceptionDate: "2021-12-01",
          premium: "R 842.00 pm",
          status: "Active",
        },
      },
    },
    {
      policyName: "Discovery Life Plan",
      type: "Pure Life",
      provider: "Discovery",
      contractNumber: "519062231",
      coverAmount: "R 1,500,000",
    },
    {
      policyName: "PPS Professional Sickness",
      type: "Income Protection",
      provider: "PPS",
      contractNumber: "PPS-00498",
      coverAmount: "R 65,000 pm",
    },
  ];

  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 mb-6 md:mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Long-Term Policies
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Policy Name
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Type
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Provider
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Contract #
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-600">
                Cover Amount & Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy, index) => {
              const isExpanded = expandedRows.includes(index);
              return (
                <React.Fragment key={index}>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {policy.details && (
                          <button
                            onClick={() => toggleRow(index)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {isExpanded ? (
                              <ChevronDown className="h-5 w-5 text-primary-dark hover:bg-blue-200 rounded" strokeWidth={2} />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-primary-dark hover:bg-blue-200 rounded" strokeWidth={2} />
                            )}
                          </button>
                        )}
                        <span className={`${
                          policy.details
                            ? "text-primary-dark"
                            : "text-gray-700"
                        }`}>{policy.policyName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{policy.type}</td>
                    <td className="py-3 px-4 text-gray-700">{policy.provider}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {policy.contractNumber}
                    </td>
                    <td className="py-3 px-4 text-gray-900 font-medium">
                      {policy.coverAmount}
                    </td>
                  </tr>
                  {/* Expanded Details */}
                  {isExpanded && policy.details && (
                    <tr className="bg-gray-50">
                      <td colSpan={5} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Policy Benefits */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">
                              Policy Benefits
                            </h4>
                            <div className="space-y-2 text-sm">
                              {policy.details.policyBenefits.lifeCover && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Life Cover</span>
                                  <span className="font-medium text-gray-900">
                                    {policy.details.policyBenefits.lifeCover}
                                  </span>
                                </div>
                              )}
                              {policy.details.policyBenefits.capitalDisability && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    Capital Disability
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    {policy.details.policyBenefits.capitalDisability}
                                  </span>
                                </div>
                              )}
                              {policy.details.policyBenefits.dreadDisease && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    Dread Disease
                                  </span>
                                  <span className="font-medium text-gray-900">
                                    {policy.details.policyBenefits.dreadDisease}
                                  </span>
                                </div>
                              )}
                              {policy.details.policyBenefits.downloadSchedule && (
                                <div className="pt-2">
                                  <button className="text-primary-dark hover:underline text-sm">
                                    Download Policy Schedule
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Policy Details */}
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">
                              Policy Details
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  Inception Date
                                </span>
                                <span className="font-medium text-gray-900">
                                  {policy.details.policyDetails.inceptionDate}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Premium</span>
                                <span className="text-gray-700">
                                  {policy.details.policyDetails.premium}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Status</span>
                                <span className="text-green-600 font-medium">
                                  {policy.details.policyDetails.status}
                                </span>
                              </div>
                              <div className="pt-4">
                                <Button size="sm" className="flex ml-auto">
                                  VIEW DETAILS
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LongTermPolicies;
