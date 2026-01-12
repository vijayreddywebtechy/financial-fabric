"use client";

import MainLayout from "@/components/layout/MainLayout";
import Header from "@/components/layout/Header";
import InsuranceTabs from "@/components/portfolioInsurance/InsuranceTabs";
import AssetInsuranceMetricCards from "@/components/portfolioInsurance/AssetInsuranceMetricCards";
import ActiveShortTermPolicies from "@/components/portfolioInsurance/ActiveShortTermPolicies";
import InsuranceHeader from "@/components/portfolioInsurance/InsuranceHeader";

type Props = {};

const AssetProtectionPage = (props: Props) => {
  return (
    <MainLayout header={<Header />}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          {/* Page Title */}
            <InsuranceHeader />

          {/* Tabs Navigation */}
          <InsuranceTabs />

          {/* Asset Insurance Overview */}
          <AssetInsuranceMetricCards />

          {/* Active Short-Term Policies */}
          <ActiveShortTermPolicies />
        </div>
      </div>
    </MainLayout>
  );
};

export default AssetProtectionPage;
