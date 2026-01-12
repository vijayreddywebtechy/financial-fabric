'use client';

import React from 'react';

interface InvestmentMetricCardProps {
  title: string;
  amount: string;
  description: string;
  bgColor?: string;
}

const InvestmentMetricCard: React.FC<InvestmentMetricCardProps> = ({
  title,
  amount,
  description,
  bgColor = 'bg-white',
}) => {
  return (
    <div className={`${bgColor} rounded-lg p-6 shadow-md border border-gray-200`}>
      <p className="text-sm text-gray-600 mb-2">{title}</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{amount}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
};

export default InvestmentMetricCard;
