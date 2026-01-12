"use client";

import MainLayout from "@/components/layout/MainLayout";
import Header from "@/components/layout/Header";
import PortfolioHeader from "@/components/portfolioInvestments/PortfolioHeader";
import PortfolioTabs from "@/components/portfolioInvestments/PortfolioTabs";
import FeeSummaryCards from "@/components/portfolioInvestments/FeeSummaryCards";
import FeeBreakdownTable from "@/components/portfolioInvestments/FeeBreakdownTable";

type Props = {};

const FeesPage = (props: Props) => {
  return (
    <MainLayout header={<Header />}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          {/* Common Header and Filter */}
          <PortfolioHeader />

          {/* Tabs Navigation */}
          <PortfolioTabs />
          
          {/* Fees Tab Content */}
          <div className="mb-6">
            <FeeSummaryCards />
          </div>


          <div>
            <FeeBreakdownTable />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FeesPage;