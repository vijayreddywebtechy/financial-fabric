"use client";

import MainLayout from "@/components/layout/MainLayout";
import Header from "@/components/layout/Header";
import PortfolioHeader from "@/components/portfolioInvestments/PortfolioHeader";
import PortfolioHero from "@/components/portfolioInvestments/PortfolioHero";
import InvestmentMetricCard from "@/components/portfolioInvestments/InvestmentMetricCard";
import CashAvailabilityChart from "@/components/portfolioInvestments/CashAvailabilityChart";
import MarketValueChart from "@/components/portfolioInvestments/MarketValueChart";
import PortfolioTabs from "@/components/portfolioInvestments/PortfolioTabs";
import DetailedPortfolioHoldings from "@/components/portfolioInvestments/DetailedPortfolioHoldings";

type Props = {};

const page = (props: Props) => {
  return (
    <MainLayout header={<Header />}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          {/* Common Header and Filter */}
          <PortfolioHeader />

          {/* Tabs Navigation */}
          <PortfolioTabs />
          
          {/* Overview Tab Content */}
          <div className="mb-6 md:mb-8">
            <PortfolioHero
              totalValue="R 6 800 000.00"
              gainAmount="R 2,544,642"
              gainPercentage="59.80%"
              initialCapital="R 4 255 358.00"
            />
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <InvestmentMetricCard
              title="Discretionary Investments"
              amount="R 2,800,000"
              description="TFSA, Endowments, Shares"
            />
            <InvestmentMetricCard
              title="Retirement Funds"
              amount="R 3,000,000"
              description="Pension & RAs (Reg 28)"
            />
            <InvestmentMetricCard
              title="Cash & Liquidity"
              amount="R 1,000,000"
              description="Bank & Money Market"
            />
            <InvestmentMetricCard
              title="Total Gain/Loss"
              amount="+ R 2,544,642"
              description="Unrealized Capital Gains"
              bgColor="bg-green-50"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <MarketValueChart />
            <CashAvailabilityChart />
          </div>

          {/* Detailed Portfolio Holdings */}
          <DetailedPortfolioHoldings />
        </div>
      </div>
    </MainLayout>
  );
};



export default page;
