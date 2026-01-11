'use client';

import React from 'react';
import OverviewHeader from './OverviewHeader';
import MetricCard from './MetricCard';
import NetWealthChart from './NetWealthChart';
import AssetAllocationChart from './AssetAllocationChart';
import TwoPotSystem from './TwoPotSystem';

const OverView: React.FC = () => {
  return (
      <div className="space-y-6">
        {/* Header Section */}
        <OverviewHeader
          netCapital={6800000}
          growth={3300000}
          growthPercent={94.29}
          initialCapital={3500000}
        />

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Net Wealth"
            value="R 6,800,000"
            statusIcon="arrow"
            statusText="Estate Aligned"
            statusColor="green"
          />
          <MetricCard
            title="Investable Assets"
            value="R 6,800,000"
            statusIcon="arrow"
            statusText="Liquid: R 1.0m"
            statusColor="green"
          />
          <MetricCard
            title="Risk Cover (Life)"
            value="R 5,439,570"
            statusIcon="dot"
            statusText="Fully Covered"
            statusColor="blue"
          />
          <MetricCard
            title="Liabilities"
            value="R 0"
            statusIcon="check"
            statusText="Debt Free"
            statusColor="green"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <NetWealthChart />
          <AssetAllocationChart />
        </div>

        {/* Two-Pot System */}
        <TwoPotSystem />
      </div>
  );
};

export default OverView;

