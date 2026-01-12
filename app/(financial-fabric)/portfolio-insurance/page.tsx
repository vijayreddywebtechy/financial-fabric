"use client";

import MainLayout from "@/components/layout/MainLayout";
import Header from "@/components/layout/Header";
import InsuranceTabs from "@/components/portfolioInsurance/InsuranceTabs";
import InsuranceMetricCards from "@/components/portfolioInsurance/InsuranceMetricCards";
import LongTermPolicies from "@/components/portfolioInsurance/LongTermPolicies";
import FinancialNeedsAnalysis from "@/components/portfolioInsurance/FinancialNeedsAnalysis";
import InsuranceHeader from "@/components/portfolioInsurance/InsuranceHeader";

type Props = {};

const page = (props: Props) => {
  return (
    <MainLayout header={<Header />}>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          <InsuranceHeader />
          {/* Tabs Navigation */}
          <InsuranceTabs />

          {/* Personal Protection Overview */}
          <InsuranceMetricCards />

          {/* Long-Term Policies */}
          <LongTermPolicies />

          {/* Financial Needs Analysis */}
          <FinancialNeedsAnalysis />
        </div>
      </div>
    </MainLayout>
  );
};

export default page;
