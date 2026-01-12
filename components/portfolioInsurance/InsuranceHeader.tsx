import React from "react";

type Props = {};

function InsuranceHeader({}: Props) {
  return (
    <div className="mb-6">
      {/* Page Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium mb-1">
        Your Insurance
      </h2>
      <div className="flex items-center gap-4 flex-wrap">
        <div className="text-sm sm:text-base text-gray-600">
          <span>Portfolio ID: 115909297</span> •{" "}
          <span>Last Updated: 9 January 2026</span>
        </div>
      </div>
    </div>
  );
}

export default InsuranceHeader;
