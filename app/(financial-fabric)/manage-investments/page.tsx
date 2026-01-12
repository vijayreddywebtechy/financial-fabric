import MainLayout from "@/components/layout/MainLayout";
import Header from "@/components/layout/Header";
import PageHeader from "@/components/manageInvestments/PageHeader";
import SelectedInvestmentsTable from "@/components/manageInvestments/SelectedInvestmentsTable";
import InvestmentUniverse from "@/components/manageInvestments/InvestmentUniverse";

type Props = {};

const page = (props: Props) => {
  return (
    <MainLayout header={<Header />}>
      <div className="bg-gray-100 py-10">
        <div className="max-w-screen-2xl mx-auto px-4">
          <PageHeader />

          {/* Selected Investments */}
          <SelectedInvestmentsTable />

          {/* Investment Universe */}
          <InvestmentUniverse />
        </div>
      </div>
    </MainLayout>
  );
};

export default page;
