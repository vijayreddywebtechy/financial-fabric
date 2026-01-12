"use client";

import { useState } from "react";
import CustomSelect, { SelectOption } from "@/components/dynamic/CustomSelect";

type Props = {};

function PageHeader({}: Props) {
  const [selectedPrimaryGoal, setSelectedPrimaryGoal] =
    useState<SelectOption | null>(null);

  const options = [
    { value: "aa", label: "Pension Funds" },
    { value: "ab", label: "Provident Funds" },
    { value: "ac", label: "Retirement Funds" },
    { value: "ad", label: "Tax Free Investments" },
    { value: "ae", label: "Endowments" },
    { value: "af", label: "Direct Investments" },
  ];

  return (
    <div>
      <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium mb-1">
        Manage Investments
      </h2>
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow mt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Account Type Selection
        </h3>
        <div className="w-full sm:w-1/4">
          <CustomSelect
            options={options}
            value={selectedPrimaryGoal}
            onChange={(newValue) => {
              setSelectedPrimaryGoal(newValue);
              console.log(newValue);
            }}
            placeholder="All Funds"
          />
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
