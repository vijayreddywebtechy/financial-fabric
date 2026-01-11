"use client";

import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Header from "@/components/layout/Header";
import { Stepper } from "@/components/dynamic/stepper";
import Needs from "@/components/financialPlanningStepper/Needs";
import Discovery from "@/components/financialPlanningStepper/Discovery";
import GapAnalysis from "@/components/financialPlanningStepper/GapAnalysis";
import Strategy from "@/components/financialPlanningStepper/Strategy";
import Proposal from "@/components/financialPlanningStepper/Proposal";

type Props = {};

const steps = [
  {
    title: "Needs",
    content: <Needs />,
  },
  {
    title: "Discovery",
    content: <Discovery />,
  },
  {
    title: "Gap Analysis",
    content: <GapAnalysis />,
  },
  {
    title: "Strategy",
    content: <Strategy />,
  },
  {
    title: "Proposal",
    content: <Proposal />,
  },
];

const page = (props: Props) => {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <MainLayout header={<Header />}>
      <div className="bg-gray-100  py-10">
        <div className="max-w-7xl mx-auto px-4">
          <Stepper
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default page;
