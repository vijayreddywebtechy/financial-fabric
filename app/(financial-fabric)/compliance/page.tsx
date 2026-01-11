import Header from "@/components/layout/Header";
import MainLayout from "@/components/layout/MainLayout";
import React from "react";

interface CustomProgressProps {
  value: number;
  max: number;
  className?: string;
}

const CustomProgress: React.FC<CustomProgressProps> = ({
  value,
  max,
  className = "",
}) => {
  const percentage = (value / max) * 100;

  return (
    <div
      className={`w-full bg-gray-200 rounded-full h-2 overflow-hidden ${className}`}
    >
      <div
        className="h-full bg-green-600 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const ComplianceDashboard: React.FC = () => {
  return (
    <MainLayout header={<Header />}>
      <div className="bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium mb-1">
              Compliance & Regulatory Status
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Portfolio ID: 115909297 • Date: 28 Oct 2025
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* FAIS & Professional Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 md:p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  FAIS & Professional Status
                </h2>
              </div>
              <div className="p-4 md:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm text-gray-600">
                    FSP License Status
                  </span>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
                    Authorized (FSP 11223)
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm text-gray-600">
                    Representative Status
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    Fit & Proper
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm text-gray-600">DOFA Date</span>
                  <span className="text-sm font-medium text-gray-900">
                    2015-06-01
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      CPD Cycle (2025/2026)
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      28 / 35 Points
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* FICA / AML Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 md:p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  FICA / AML Status
                </h2>
              </div>
              <div className="p-4 md:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm text-gray-600">
                    Identity Verification
                  </span>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
                    Verified
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm text-gray-600">
                    Proof of Address
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    Valid (&lt; 3 months)
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm text-gray-600">
                    Sanction Screening
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    Clear
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm text-gray-600">Risk Rating</span>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
                    Low
                  </span>
                </div>
              </div>
            </div>

            {/* Regulation 28 (Pension Funds) */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 md:p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Regulation 28 (Pension Funds)
                </h2>
              </div>
              <div className="p-4 md:p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Equity Exposure (Max 75%)
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      62.4%
                    </span>
                  </div>
                  <CustomProgress value={62.4} max={75} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Property Exposure (Max 25%)
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      12.5%
                    </span>
                  </div>
                  <CustomProgress value={12.5} max={25} />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Offshore Exposure (Max 45%)
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      32.0%
                    </span>
                  </div>
                  <CustomProgress value={32.0} max={45} />
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    Compliant
                  </span>
                </div>
              </div>
            </div>

            {/* POPIA & Documentation */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 md:p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  POPIA & Documentation
                </h2>
              </div>
              <div className="p-4 md:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm text-gray-600">
                    Data Privacy Consent
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    Signed (2025-10-28)
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm text-gray-600">FNA Record</span>
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
                    Archived
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm text-gray-600">
                    Record of Advice
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    Generated
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-sm text-gray-600">
                    Conflict of Interest Policy
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    Disclosed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ComplianceDashboard;
