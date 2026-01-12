'use client';

import React from 'react';

interface PortfolioHeroProps {
  totalValue: string;
  gainAmount: string;
  gainPercentage: string;
  initialCapital: string;
}

const PortfolioHero: React.FC<PortfolioHeroProps> = ({
  totalValue,
  gainAmount,
  gainPercentage,
  initialCapital,
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 rounded-xl p-6 md:p-8 text-white shadow-lg">
      <div className="text-center">
        <p className="text-xs md:text-sm text-blue-200 mb-2">
          Your total portfolio value
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
          {totalValue}
        </h1>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-green-400">▲</span>
          <span className="text-sm md:text-base">
            {gainAmount} ({gainPercentage}) Since inception
          </span>
        </div>
        <div className="text-xs md:text-sm text-blue-200 bg-blue-950 max-w-max mx-auto px-3 py-1 rounded-full">
          Initial Net Capital: {initialCapital}
        </div>
        <p className="text-xs text-blue-300 mt-3">
          * Returns shown are net of fund fees. Admin & Advice fees are billed separately.
        </p>
      </div>
    </div>
  );
};

export default PortfolioHero;
