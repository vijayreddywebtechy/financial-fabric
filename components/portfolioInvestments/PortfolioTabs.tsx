'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Tab {
  label: string;
  href: string;
}

const tabs: Tab[] = [
  { label: 'Overview', href: '/portfolio-investments' },
  { label: 'Performance', href: '/portfolio-investments/performance' },
  { label: 'Holdings', href: '/portfolio-investments/holdings' },
  { label: 'Transactions', href: '/portfolio-investments/transactions' },
  { label: 'Fees', href: '/portfolio-investments/fees' },
];

const PortfolioTabs: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="border-b border-gray-300 mb-6">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`
                    py-3 text-sm md:text-base whitespace-nowrap
                  border-b-2 transition-colors
                  ${
                    isActive
                      ? 'border-primary-dark text-primary-dark font-medium'
                      : 'border-transparent text-gray-900 hover:text-gray-900'
                  }
                `}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
    </div>
  );
};

export default PortfolioTabs;
