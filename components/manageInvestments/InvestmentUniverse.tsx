"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Search,
  Grid3x3,
  List,
  Plus,
  Download,
  Star,
  Settings2,
  ListFilter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CustomSelect, { SelectOption } from "@/components/dynamic/CustomSelect";
import { Button } from "@/components/ui/button";
import AdvancedFilters, { FilterState } from "./AdvancedFilters";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Fund {
  instrId: string;
  description: string;
  manager: string;
  type: string;
  assetClass: string;
  riskProfile: string;
  benchmark: string;
  exchange: string;
  reg28: string;
  style: string;
  unitPrice: string;
  details?: {
    fundBasics: {
      category: string;
      isin: string;
      fundSize: string;
    };
    performance: {
      oneYear: string;
      threeYear: string;
    };
    fees: {
      mgmtFee: string;
      tic: string;
    };
    holdings: {
      top1: { name: string; percentage: string };
      top2: { name: string; percentage: string };
    };
  };
}

const InvestmentUniverse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [expandedRows, setExpandedRows] = useState<number[]>([0]);
  const [filterFunds, setFilterFunds] = useState("all");
  const [filterRiskProfiles, setFilterRiskProfiles] = useState<string[]>([]);
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
    managers: [],
    types: [],
    assetClasses: [],
  });
  const [favoriteRows, setFavoriteRows] = useState<number[]>([0]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [visibleColumns, setVisibleColumns] = useState({
    instrId: true,
    description: true,
    manager: true,
    type: true,
    assetClass: true,
    riskProfile: true,
    benchmark: true,
    exchange: true,
    reg28: true,
    style: true,
    unitPrice: true,
  });

  const funds: Fund[] = [
    {
      instrId: "LIB-FI-01",
      description: "Liberty Flex Income",
      manager: "Liberty",
      type: "Unit Trust",
      assetClass: "Bond",
      riskProfile: "Income",
      benchmark: "STeF1",
      exchange: "JSE",
      reg28: "Yes",
      style: "Active",
      unitPrice: "1.20",
      details: {
        fundBasics: {
          category: "Income",
          isin: "ZAE000000000",
          fundSize: "R 12.5bn",
        },
        performance: {
          oneYear: "+12.5%",
          threeYear: "+9.8%",
        },
        fees: {
          mgmtFee: "0.85%",
          tic: "1.15%",
        },
        holdings: {
          top1: { name: "Naspers", percentage: "8.5%" },
          top2: { name: "FirstRand", percentage: "6.2%" },
        },
      },
    },
    {
      instrId: "SL-FI-02",
      description: "STANLIB Flex Income",
      manager: "STANLIB",
      type: "Unit Trust",
      assetClass: "Bond",
      riskProfile: "Income",
      benchmark: "STeF1",
      exchange: "JSE",
      reg28: "Yes",
      style: "Active",
      unitPrice: "1.15",
    },
    {
      instrId: "LIB-MM-03",
      description: "Liberty MM Flex Income",
      manager: "Liberty",
      type: "Unit Trust",
      assetClass: "Bond",
      riskProfile: "Income",
      benchmark: "STeF1",
      exchange: "JSE",
      reg28: "Yes",
      style: "Active",
      unitPrice: "1.05",
    },
    {
      instrId: "SB-FI-04",
      description: "Standard Flex Inc FOF / MP",
      manager: "Standard Bank",
      type: "Unit Trust",
      assetClass: "Bond",
      riskProfile: "Income",
      benchmark: "STeF1",
      exchange: "JSE",
      reg28: "Yes",
      style: "Active",
      unitPrice: "1.30",
    },
    {
      instrId: "LIB-MA-05",
      description: "Liberty M-A Cautious",
      manager: "Liberty",
      type: "Unit Trust",
      assetClass: "Multi-Asset",
      riskProfile: "Stable",
      benchmark: "CPI+3%",
      exchange: "JSE",
      reg28: "Yes",
      style: "Active",
      unitPrice: "14.50",
    },
    {
      instrId: "LIB-MMS-06",
      description: "Liberty MM Stable",
      manager: "Liberty",
      type: "Unit Trust",
      assetClass: "Multi-Asset",
      riskProfile: "Stable",
      benchmark: "CPI+3%",
      exchange: "JSE",
      reg28: "Yes",
      style: "Active",
      unitPrice: "14.20",
    },
    {
      instrId: "SL-MA-07",
      description: "STANLIB M-A Cautious",
      manager: "STANLIB",
      type: "Unit Trust",
      assetClass: "Multi-Asset",
      riskProfile: "Stable",
      benchmark: "CPI+3%",
      exchange: "JSE",
      reg28: "Yes",
      style: "Active",
      unitPrice: "15.00",
    },
    {
      instrId: "SB-SF-08",
      description: "Standard Stable FoF / MP",
      manager: "Standard Bank",
      type: "Unit Trust",
      assetClass: "Multi-Asset",
      riskProfile: "Stable",
      benchmark: "CPI+3%",
      exchange: "JSE",
      reg28: "Yes",
      style: "Active",
      unitPrice: "14.80",
    },
    {
      instrId: "LIB-MAM-09",
      description: "Liberty M-A Moderate",
      manager: "Liberty",
      type: "Unit Trust",
      assetClass: "Multi-Asset",
      riskProfile: "Moderate",
      benchmark: "CPI+5%",
      exchange: "JSE",
      reg28: "Yes",
      style: "Active",
      unitPrice: "21.00",
    },
  ];

  const toggleRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleFavorite = (index: number) => {
    setFavoriteRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleColumn = (column: keyof typeof visibleColumns) => {
    setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  const toggleRiskProfile = (value: string) => {
    setFilterRiskProfiles((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4 text-[#003FCA]" />
    ) : (
      <ArrowDown className="h-4 w-4 text-[#003FCA]" />
    );
  };

  const sortedFunds = [...funds].sort((a, b) => {
    if (!sortColumn) return 0;
    
    const aValue = a[sortColumn as keyof Fund]?.toString() || "";
    const bValue = b[sortColumn as keyof Fund]?.toString() || "";
    
    if (sortColumn === "unitPrice") {
      const aNum = parseFloat(aValue);
      const bNum = parseFloat(bValue);
      return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
    }
    
    return sortDirection === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  // Pagination calculations
  const totalFunds = sortedFunds.length;
  const totalPages = Math.ceil(totalFunds / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedFunds = sortedFunds.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRowsPerPageChange = (value: string) => {
    setRowsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page
  };

  const riskOptions = [
    { value: "balanced", label: "Balanced" },
    { value: "flexibleGrowth", label: "Flexible Growth" },
    { value: "income", label: "Income" },
    { value: "liquidity", label: "Liquidity" },
    { value: "moderate", label: "Moderate" },
    { value: "stable", label: "Stable" },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200 mt-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Investment Universe
        </h3>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
          <div className="flex-1 relative w-full lg:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Instrument Name, ISIN or Manager..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003FCA] focus:border-transparent"
            />
          </div>

          <div className="flex gap-2">
            {/* Filter Funds with Radio Options */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-52 justify-between">
                  <span>
                    {filterFunds === "all" && "All Funds"}
                    {filterFunds === "core" && "Core House View"}
                    {filterFunds === "extended" && "Extended House View"}
                  </span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-52">
                <div className="p-2 space-y-1">
                  <label className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-100 rounded">
                    <input
                      type="radio"
                      name="filterFunds"
                      value="all"
                      checked={filterFunds === "all"}
                      onChange={(e) => setFilterFunds(e.target.value)}
                      className="text-[#003FCA] focus:ring-[#003FCA]"
                    />
                    <span className="text-sm">All Funds</span>
                  </label>
                  <label className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-100 rounded">
                    <input
                      type="radio"
                      name="filterFunds"
                      value="core"
                      checked={filterFunds === "core"}
                      onChange={(e) => setFilterFunds(e.target.value)}
                      className="text-[#003FCA] focus:ring-[#003FCA]"
                    />
                    <span className="text-sm">Core House View</span>
                  </label>
                  <label className="flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-100 rounded">
                    <input
                      type="radio"
                      name="filterFunds"
                      value="extended"
                      checked={filterFunds === "extended"}
                      onChange={(e) => setFilterFunds(e.target.value)}
                      className="text-[#003FCA] focus:ring-[#003FCA]"
                    />
                    <span className="text-sm">Extended House View</span>
                  </label>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Filter Risk Profile - Multi-Select */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-52 justify-between">
                  <span>
                    {filterRiskProfiles.length === 0
                      ? "Filter Risk Profile"
                      : `${filterRiskProfiles.length} selected`}
                  </span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-52">
                {riskOptions.map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option.value}
                    checked={filterRiskProfiles.includes(option.value)}
                    onCheckedChange={() => toggleRiskProfile(option.value)}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Advanced Filters */}
            <AdvancedFilters onFiltersChange={setAdvancedFilters} />

            {/* Show/Hide Columns */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Settings2 className="!h-5 !w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.instrId}
                  onCheckedChange={() => toggleColumn("instrId")}
                >
                  Instr. ID
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.description}
                  onCheckedChange={() => toggleColumn("description")}
                >
                  Description
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.manager}
                  onCheckedChange={() => toggleColumn("manager")}
                >
                  Manager
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.type}
                  onCheckedChange={() => toggleColumn("type")}
                >
                  Type
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.assetClass}
                  onCheckedChange={() => toggleColumn("assetClass")}
                >
                  Asset Class
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.riskProfile}
                  onCheckedChange={() => toggleColumn("riskProfile")}
                >
                  Risk Profile
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.benchmark}
                  onCheckedChange={() => toggleColumn("benchmark")}
                >
                  Benchmark
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.exchange}
                  onCheckedChange={() => toggleColumn("exchange")}
                >
                  Exchange
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.reg28}
                  onCheckedChange={() => toggleColumn("reg28")}
                >
                  Reg 28
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.style}
                  onCheckedChange={() => toggleColumn("style")}
                >
                  Style
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={visibleColumns.unitPrice}
                  onCheckedChange={() => toggleColumn("unitPrice")}
                >
                  Unit Price
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-gray-200">
                <th className="text-left py-3 px-2 font-medium text-gray-600"></th>
                <th className="text-left py-3 px-2 font-medium text-gray-600"></th>
                {visibleColumns.instrId && (
                  <th className="text-left py-3 px-2 font-medium text-gray-600">
                    <button
                      onClick={() => handleSort("instrId")}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      <span>Instr. ID</span>
                      {getSortIcon("instrId")}
                    </button>
                  </th>
                )}
                {visibleColumns.description && (
                  <th className="text-left py-3 px-2 font-medium text-gray-600">
                    <button
                      onClick={() => handleSort("description")}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      <span>Description</span>
                      {getSortIcon("description")}
                    </button>
                  </th>
                )}
                {visibleColumns.manager && (
                  <th className="text-left py-3 px-2 font-medium text-gray-600">
                    <button
                      onClick={() => handleSort("manager")}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      <span>Manager</span>
                      {getSortIcon("manager")}
                    </button>
                  </th>
                )}
                {visibleColumns.type && (
                  <th className="text-left py-3 px-2 font-medium text-gray-600">
                    <button
                      onClick={() => handleSort("type")}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      <span>Type</span>
                      {getSortIcon("type")}
                    </button>
                  </th>
                )}
                {visibleColumns.assetClass && (
                  <th className="text-left py-3 px-2 font-medium text-gray-600">
                    <button
                      onClick={() => handleSort("assetClass")}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      <span>Asset Class</span>
                      {getSortIcon("assetClass")}
                    </button>
                  </th>
                )}
                {visibleColumns.riskProfile && (
                  <th className="text-left py-3 px-2 font-medium text-gray-600">
                    <button
                      onClick={() => handleSort("riskProfile")}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      <span>Risk Profile</span>
                      {getSortIcon("riskProfile")}
                    </button>
                  </th>
                )}
                {visibleColumns.benchmark && (
                  <th className="text-left py-3 px-2 font-medium text-gray-600">
                    <button
                      onClick={() => handleSort("benchmark")}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      <span>Benchmark</span>
                      {getSortIcon("benchmark")}
                    </button>
                  </th>
                )}
                {visibleColumns.exchange && (
                  <th className="text-left py-3 px-2 font-medium text-gray-600">
                    <button
                      onClick={() => handleSort("exchange")}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      <span>Exchange</span>
                      {getSortIcon("exchange")}
                    </button>
                  </th>
                )}
                {visibleColumns.reg28 && (
                  <th className="text-left py-3 px-2 font-medium text-gray-600">
                    <button
                      onClick={() => handleSort("reg28")}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      <span>Reg 28</span>
                      {getSortIcon("reg28")}
                    </button>
                  </th>
                )}
                {visibleColumns.style && (
                  <th className="text-left py-3 px-2 font-medium text-gray-600">
                    <button
                      onClick={() => handleSort("style")}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      <span>Style</span>
                      {getSortIcon("style")}
                    </button>
                  </th>
                )}
                {visibleColumns.unitPrice && (
                  <th className="text-left py-3 px-2 font-medium text-gray-600">
                    <button
                      onClick={() => handleSort("unitPrice")}
                      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
                    >
                      <span>Unit Price</span>
                      {getSortIcon("unitPrice")}
                    </button>
                  </th>
                )}
                <th className="text-left py-3 px-2 font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedFunds.map((fund, index) => {
                const isExpanded = expandedRows.includes(startIndex + index);
                return (
                  <React.Fragment key={index}>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2">
                        {fund.details && (
                          <button
                            onClick={() => toggleRow(startIndex + index)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            {isExpanded ? (
                              <ChevronDown
                                className="h-5 w-5 text-primary-dark hover:bg-blue-200 rounded"
                                strokeWidth={2}
                              />
                            ) : (
                              <ChevronDown
                                className="h-5 w-5 text-primary-dark hover:bg-blue-200 rounded"
                                strokeWidth={2}
                                style={{ transform: "rotate(-90deg)" }}
                              />
                            )}
                          </button>
                        )}
                      </td>
                      <td className="py-3 px-2">
                        <button
                          onClick={() => toggleFavorite(startIndex + index)}
                          className="cursor-pointer hover:text-yellow-500 transition-colors"
                        >
                          <Star
                            className={`h-5 w-5 ${
                              favoriteRows.includes(startIndex + index)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-400"
                            }`}
                          />
                        </button>
                      </td>
                      {visibleColumns.instrId && (
                        <td className="py-3 px-2 text-gray-700">
                          {fund.instrId}
                        </td>
                      )}
                      {visibleColumns.description && (
                        <td className="py-3 px-2 text-primary-dark">
                          {fund.description}
                        </td>
                      )}
                      {visibleColumns.manager && (
                        <td className="py-3 px-2 text-gray-700">
                          {fund.manager}
                        </td>
                      )}
                      {visibleColumns.type && (
                        <td className="py-3 px-2 text-gray-700">{fund.type}</td>
                      )}
                      {visibleColumns.assetClass && (
                        <td className="py-3 px-2 text-gray-700">
                          {fund.assetClass}
                        </td>
                      )}
                      {visibleColumns.riskProfile && (
                        <td className="py-3 px-2 text-gray-700">
                          {fund.riskProfile}
                        </td>
                      )}
                      {visibleColumns.benchmark && (
                        <td className="py-3 px-2 text-gray-700">
                          {fund.benchmark}
                        </td>
                      )}
                      {visibleColumns.exchange && (
                        <td className="py-3 px-2 text-gray-700">
                          {fund.exchange}
                        </td>
                      )}
                      {visibleColumns.reg28 && (
                        <td className="py-3 px-2 text-gray-700">
                          {fund.reg28}
                        </td>
                      )}
                      {visibleColumns.style && (
                        <td className="py-3 px-2 text-gray-700">
                          {fund.style}
                        </td>
                      )}
                      {visibleColumns.unitPrice && (
                        <td className="py-3 px-2 text-gray-700">
                          {fund.unitPrice}
                        </td>
                      )}
                      <td className="py-3 px-4">
                        <button className="text-[#003FCA] hover:text-[#0047BB] bg-blue-50 hover:bg-blue-100 rounded p-1.5 transition-colors">
                          <Plus className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Details */}
                    {!isExpanded && fund.details && (
                      <tr className="bg-gray-50">
                        <td colSpan={14} className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Fund Basics */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">
                                Fund Basics
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    Category
                                  </span>
                                  <span className="text-gray-900">
                                    {fund.details.fundBasics.category}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">ISIN</span>
                                  <span className="text-gray-900">
                                    {fund.details.fundBasics.isin}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    Fund Size
                                  </span>
                                  <span className="text-gray-900">
                                    {fund.details.fundBasics.fundSize}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Performance */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">
                                Performance
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">1 Year</span>
                                  <span className="text-green-600 font-medium">
                                    {fund.details.performance.oneYear}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">3 Year</span>
                                  <span className="text-green-600 font-medium">
                                    {fund.details.performance.threeYear}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Fees */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">
                                Fees
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    Mgmt Fee
                                  </span>
                                  <span className="text-gray-900">
                                    {fund.details.fees.mgmtFee}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">TIC</span>
                                  <span className="text-gray-900">
                                    {fund.details.fees.tic}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Holdings */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">
                                Holdings
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    {fund.details.holdings.top1.name}
                                  </span>
                                  <span className="text-gray-900">
                                    {fund.details.holdings.top1.percentage}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">
                                    {fund.details.holdings.top2.name}
                                  </span>
                                  <span className="text-gray-900">
                                    {fund.details.holdings.top2.percentage}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <Button className="flex mt-4 ml-auto" size="sm">
                            <Download className="h-3 w-3" />
                            <span>Download Fact Sheet</span>
                          </Button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => handleRowsPerPageChange(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#003FCA]"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              {startIndex + 1}-{Math.min(endIndex, totalFunds)} of {totalFunds}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentUniverse;
