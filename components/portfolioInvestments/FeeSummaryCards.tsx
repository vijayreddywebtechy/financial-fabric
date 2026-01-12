'use client';

import React from 'react';

const FeeSummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Estimated Annual Cost */}
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
        <p className="text-sm text-gray-600 mb-2">Estimated Annual Cost (EAC)</p>
        <h2 className="text-2xl font-medium text-primary-dark mb-1">1.15%</h2>
        <p className="text-xs text-gray-500">Weighted Average</p>
      </div>

      {/* Total Cost in Rands */}
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
        <p className="text-sm text-gray-600 mb-2">Total Cost in Rands (Est.)</p>
        <h2 className="text-2xl font-medium text-red-600 mb-1">R 78,150</h2>
        <p className="text-xs text-gray-500">Per Annum</p>
      </div>

      {/* Most Expensive Asset */}
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
        <p className="text-sm text-gray-600 mb-2">Most Expensive Asset</p>
        <h2 className="text-lg font-medium text-gray-900 mb-1">International Endowment (2.00%)</h2>
      </div>
    </div>
  );
};

export default FeeSummaryCards;
