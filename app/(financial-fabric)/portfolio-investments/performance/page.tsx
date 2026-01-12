"use client";

import MainLayout from "@/components/layout/MainLayout";
import Header from "@/components/layout/Header";
import PortfolioHeader from "@/components/portfolioInvestments/PortfolioHeader";
import PortfolioTabs from "@/components/portfolioInvestments/PortfolioTabs";
import PerformanceSnapshot from "@/components/portfolioInvestments/PerformanceSnapshot";
import ComparativeReturnsChart from "@/components/portfolioInvestments/ComparativeReturnsChart";
import GainsLossesTable from "@/components/portfolioInvestments/GainsLossesTable";
import CashFlowPieChart from "@/components/portfolioInvestments/CashFlowPieChart";
import PortfolioRiskChart from "@/components/portfolioInvestments/PortfolioRiskChart";

type Props = {};

const PerformancePage = (props: Props) => {
  return (
    <MainLayout header={<Header />}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          {/* Common Header and Filter */}
          <PortfolioHeader />

          {/* Tabs Navigation */}
          <PortfolioTabs />

          {/* Performance Snapshot */}
          <div className="mb-6 md:mb-8">
            <PerformanceSnapshot />
          </div>

          {/* Comparative Returns Chart */}
          <div className="mb-6 md:mb-8">
            <ComparativeReturnsChart />
          </div>

          {/* Gains/Losses and Cash Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 md:mb-8">
            <div className="lg:col-span-2">
              <GainsLossesTable />
            </div>
            <div>
              <CashFlowPieChart />
            </div>
          </div>

          {/* Portfolio Risk vs Market */}
          <PortfolioRiskChart />
        </div>
      </div>
    </MainLayout>
  );
};

export default PerformancePage;
