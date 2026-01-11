import MainLayout from "@/components/layout/MainLayout"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

export default function Page() {
  return (
    <MainLayout
      header={<Header />}
      footer={<Footer />}
    >
      <div className="p-6">
        Page content goes here
      </div>
    </MainLayout>
  )
}
