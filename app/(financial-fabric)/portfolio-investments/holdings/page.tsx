"use client";

import MainLayout from "@/components/layout/MainLayout";
import Header from "@/components/layout/Header";
import PortfolioHeader from "@/components/portfolioInvestments/PortfolioHeader";
import PortfolioTabs from "@/components/portfolioInvestments/PortfolioTabs";
import Top10Holdings from "@/components/portfolioInvestments/Top10Holdings";
import TotalAssetAllocation from "@/components/portfolioInvestments/TotalAssetAllocation";
import IndustrySplitChart from "@/components/portfolioInvestments/IndustrySplitChart";
import CurrencyAllocation from "@/components/portfolioInvestments/CurrencyAllocation";
import GeographicAllocation from "@/components/portfolioInvestments/GeographicAllocation";

type Props = {};

const HoldingsPage = (props: Props) => {
  return (
    <MainLayout header={<Header />}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          {/* Common Header and Filter */}
          <PortfolioHeader />

          {/* Tabs Navigation */}
          <PortfolioTabs />
          {/* Top 10 Holdings */}
          <div className="mb-6 md:mb-8">
            <Top10Holdings />
          </div>

          {/* Asset Allocation and Industry Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 md:mb-8">
            <TotalAssetAllocation />
            <IndustrySplitChart />
          </div>

          {/* Currency and Geographic Allocation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CurrencyAllocation />
            <GeographicAllocation />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HoldingsPage;
