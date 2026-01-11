import MainLayout from "@/components/layout/MainLayout";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import OverView from "@/components/overview/OverView";

export default function Page() {
  return (
    <MainLayout header={<Header />} footer={<Footer />}>
      <div className="bg-gray-100  py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium mb-1">
              Welcome Back, James
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Portfolio ID: 115909297 • Date: 28 Oct 2025
            </p>
          </div>
          <OverView />
        </div>
      </div>
    </MainLayout>
  );
}
