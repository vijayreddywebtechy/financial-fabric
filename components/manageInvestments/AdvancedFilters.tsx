"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

interface AdvancedFiltersProps {
  onFiltersChange?: (filters: FilterState) => void;
}

export interface FilterState {
  managers: string[];
  types: string[];
  assetClasses: string[];
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    managers: [],
    types: [],
    assetClasses: [],
  });

  const managerOptions = [
    "Sygnia",
    "Satrix",
    "Old Mutual",
    "Vanguard",
    "M&G",
    "Fairtree",
    "Foord",
  ];

  const typeOptions = ["Unit Trust", "ETF", "Feeder Fund"];

  const assetClassOptions = [
    "Equity",
    "Multi-Asset",
    "Global Equity",
    "Domestic",
  ];

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const updated = {
        ...prev,
        [category]: prev[category].includes(value)
          ? prev[category].filter((v) => v !== value)
          : [...prev[category], value],
      };
      onFiltersChange?.(updated);
      return updated;
    });
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      managers: [],
      types: [],
      assetClasses: [],
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const totalFiltersCount =
    filters.managers.length + filters.types.length + filters.assetClasses.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative">
          <ListFilter className="h-5 w-5" />
          {totalFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#003FCA] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalFiltersCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
          <button
            onClick={clearAllFilters}
            className="text-xs text-[#003FCA] hover:underline"
          >
            Clear All
          </button>
        </div>

        {/* Manager Filters */}
        <div className="px-3 py-2 border-b border-gray-100">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Manager</h4>
          <div className="space-y-1.5">
            {managerOptions.map((manager) => (
              <label
                key={manager}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={filters.managers.includes(manager)}
                  onChange={() => toggleFilter("managers", manager)}
                  className="h-4 w-4 text-[#003FCA] focus:ring-[#003FCA] border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{manager}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Type Filters */}
        <div className="px-3 py-2 border-b border-gray-100">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Type</h4>
          <div className="space-y-1.5">
            {typeOptions.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={filters.types.includes(type)}
                  onChange={() => toggleFilter("types", type)}
                  className="h-4 w-4 text-[#003FCA] focus:ring-[#003FCA] border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Asset Class Filters */}
        <div className="px-3 py-2">
          <h4 className="text-xs font-medium text-gray-700 mb-2">Asset Class</h4>
          <div className="space-y-1.5">
            {assetClassOptions.map((assetClass) => (
              <label
                key={assetClass}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={filters.assetClasses.includes(assetClass)}
                  onChange={() => toggleFilter("assetClasses", assetClass)}
                  className="h-4 w-4 text-[#003FCA] focus:ring-[#003FCA] border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{assetClass}</span>
              </label>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdvancedFilters;
