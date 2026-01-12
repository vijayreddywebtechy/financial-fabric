import { useState } from "react";
import CustomSelect, { SelectOption } from "@/components/dynamic/CustomSelect";
import { Label } from "@/components/ui/label";
import AssessmentBlock from "@/components/financialPlanningStepper/blocks/AssessmentBlock";
import PriorityRating from "./blocks/PriorityRating";

type Props = {};

const Needs = (props: Props) => {
  const [selectedPrimaryGoal, setSelectedPrimaryGoal] =
  useState<SelectOption | null>(null);

  const options = [
    { value: "retirement", label: "Retirement Planning" },
    { value: "investment", label: "Investment Planning" },
    { value: "risk", label: "Risk Planning" },
    { value: "estate", label: "Estate Planning" },
    { value: "business", label: "Business Planning" },
    { value: "education", label: "Education" },
    { value: "insurance", label: "Insurance" },
    { value: "holiday", label: "Holiday/Lifestyle" },
  ];

  return (
      <div className="bg-white border border-gray-200 p-4 sm:p-6 md:p-8 rounded shadow">
        <div className="pb-6 mb-6 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium mb-1">
            Needs Analysis
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Establish goals and risk capacity.
          </p>
        </div>
        <div>
          <Label className="mb-2 block">
            Primary Advice Goal
          </Label>
          <CustomSelect
            options={options}
            value={selectedPrimaryGoal}
            onChange={(newValue) => {
              setSelectedPrimaryGoal(newValue);
              console.log(newValue);
            }}
            placeholder="Select your need"
          />
        </div>

        <div className="mt-8">
          <AssessmentBlock />
        </div>
        <div className="mt-8">
          <PriorityRating />
        </div>
      </div>
  );
};

export default Needs;
