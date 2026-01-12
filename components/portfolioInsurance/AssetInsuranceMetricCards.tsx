"use client";

import React from "react";

interface MetricCardProps {
  label: string;
  value: string;
  valueColor?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, valueColor = "text-[#003FCA]" }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <p className="text-sm text-gray-600 mb-2">{label}</p>
      <p className={`text-2xl font-medium ${valueColor}`}>{value}</p>
    </div>
  );
};

const AssetInsuranceMetricCards = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 mb-6 md:mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Asset Insurance Overview
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <MetricCard label="Total Insured Value" value="R 4,895,000" valueColor="text-primary-dark" />
        <MetricCard label="Total Monthly Premium" value="R 1,700.00" valueColor="text-gray-600" />
        <MetricCard label="Claims Ratio (3yr)" value="0% (No Claims)" valueColor="text-green-800" />
      </div>
    </div>
  );
};

export default AssetInsuranceMetricCards;
