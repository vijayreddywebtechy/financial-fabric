"use client";

import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Props } from "react-select";
import MainLayout from "@/components/layout/MainLayout";
import Header from "@/components/layout/Header";
import PortfolioHeader from "@/components/portfolioInvestments/PortfolioHeader";
import PortfolioTabs from "@/components/portfolioInvestments/PortfolioTabs";
import { Label } from "@/components/ui/label";

interface Transaction {
  date: string;
  type: string;
  movement: string;
  units: string;
  unitBal: string;
  movValue: string;
  mktValBal: string;
  cashBal: string;
  totalBal: string;
}

const transactions: Transaction[] = [
  {
    date: "28 Oct 2025",
    type: "Service Charges",
    movement: "Fee",
    units: "-",
    unitBal: "-",
    movValue: "- R 100.60",
    mktValBal: "-",
    cashBal: "R 85,200.69",
    totalBal: "R 6,801,200.00",
  },
  {
    date: "28 Oct 2025",
    type: "Interest Payment [Interest Accruals-ZAR]",
    movement: "Income",
    units: "-",
    unitBal: "-",
    movValue: "+ R 529.69",
    mktValBal: "-",
    cashBal: "R 85,730.38",
    totalBal: "R 6,801,729.00",
  },
  {
    date: "25 Oct 2025",
    type: "Debit Order (RA Contribution)",
    movement: "Buy",
    units: "45.20",
    unitBal: "1,245.20",
    movValue: "R 5,000.00",
    mktValBal: "R 1,245,200.00",
    cashBal: "R 80,730.38",
    totalBal: "R 6,806,729.00",
  },
  {
    date: "22 Oct 2025",
    type: "Local dividend [Naspers Ltd]",
    movement: "Income",
    units: "-",
    unitBal: "-",
    movValue: "R 6,072.00",
    mktValBal: "-",
    cashBal: "R 86,802.38",
    totalBal: "R 6,812,801.00",
  },
  {
    date: "22 Oct 2025",
    type: "Local dividend [Prosus NV]",
    movement: "Income",
    units: "-",
    unitBal: "-",
    movValue: "R 4,250.00",
    mktValBal: "-",
    cashBal: "R 82,552.38",
    totalBal: "R 6,808,551.00",
  },
  {
    date: "22 Oct 2025",
    type: "Distribution of local Interest [Stanlib Bond Fund]",
    movement: "Income",
    units: "-",
    unitBal: "-",
    movValue: "R 182.81",
    mktValBal: "-",
    cashBal: "R 86,985.19",
    totalBal: "R 6,812,983.00",
  },
  {
    date: "15 Oct 2025",
    type: "Scrip Charge",
    movement: "Fee",
    units: "-",
    unitBal: "-",
    movValue: "- R 86.25",
    mktValBal: "-",
    cashBal: "R 86,898.94",
    totalBal: "R 6,812,896.00",
  },
  {
    date: "01 Oct 2025",
    type: "Mgmt Fee (Annual)",
    movement: "Sell",
    units: "-11.50",
    unitBal: "1,200.00",
    movValue: "- R 1,250.00",
    mktValBal: "R 1,198,000.00",
    cashBal: "R 86,898.94",
    totalBal: "R 6,811,646.00",
  },
  {
    date: "28 Sep 2025",
    type: "Debit Order (RA Contribution)",
    movement: "Buy",
    units: "44.80",
    unitBal: "1,200.00",
    movValue: "R 5,000.00",
    mktValBal: "R 1,235,000.00",
    cashBal: "R 81,898.94",
    totalBal: "R 6,800,898.00",
  },
  {
    date: "25 Sep 2025",
    type: "Buy [Stanlib Global Equity]",
    movement: "Buy",
    units: "150.00",
    unitBal: "150.00",
    movValue: "- R 97,280.00",
    mktValBal: "R 97,280.00",
    cashBal: "- R 10,381.06",
    totalBal: "R 6,714,366.00",
  },
  {
    date: "20 Sep 2025",
    type: "Local dividend [Standard Bank Group]",
    movement: "Income",
    units: "-",
    unitBal: "-",
    movValue: "R 3,200.00",
    mktValBal: "-",
    cashBal: "R 86,898.94",
    totalBal: "R 6,711,166.00",
  },
  {
    date: "05 Sep 2025",
    type: "Foreign dividend [BHP Group]",
    movement: "Income",
    units: "-",
    unitBal: "-",
    movValue: "R 1,835.88",
    mktValBal: "-",
    cashBal: "R 83,698.94",
    totalBal: "R 6,707,966.00",
  },
  {
    date: "01 Sep 2025",
    type: "Mgmt Fee (Monthly)",
    movement: "Sell",
    units: "-2.10",
    unitBal: "1,155.20",
    movValue: "- R 250.00",
    mktValBal: "R 1,190,000.00",
    cashBal: "R 81,863.06",
    totalBal: "R 6,706,130.00",
  },
  {
    date: "28 Aug 2025",
    type: "Debit Order (RA Contribution)",
    movement: "Buy",
    units: "44.50",
    unitBal: "1,157.30",
    movValue: "R 5,000.00",
    mktValBal: "R 1,185,000.00",
    cashBal: "R 76,863.06",
    totalBal: "R 6,701,130.00",
  },
  {
    date: "28 Aug 2025",
    type: "Interest Payment [Interest Accruals-ZAR]",
    movement: "Income",
    units: "-",
    unitBal: "-",
    movValue: "+ R 498.22",
    mktValBal: "-",
    cashBal: "R 81,364.84",
    totalBal: "R 6,696,130.00",
  },
  {
    date: "20 Aug 2025",
    type: "Cash Withdrawal",
    movement: "Withdrawal",
    units: "-",
    unitBal: "-",
    movValue: "- R 25,000.00",
    mktValBal: "-",
    cashBal: "R 105,866.62",
    totalBal: "R 6,695,632.00",
  },
  {
    date: "15 Aug 2025",
    type: "Scrip Charge",
    movement: "Fee",
    units: "-",
    unitBal: "-",
    movValue: "- R 86.25",
    mktValBal: "-",
    cashBal: "R 130,866.62",
    totalBal: "R 6,720,632.00",
  },
  {
    date: "05 Aug 2025",
    type: "Foreign dividend [Apple Inc]",
    movement: "Income",
    units: "-",
    unitBal: "-",
    movValue: "R 1,450.00",
    mktValBal: "-",
    cashBal: "R 130,952.87",
    totalBal: "R 6,720,718.00",
  },
  {
    date: "01 Aug 2025",
    type: "Mgmt Fee (Monthly)",
    movement: "Sell",
    units: "-2.05",
    unitBal: "1,112.80",
    movValue: "- R 248.00",
    mktValBal: "R 1,180,000.00",
    cashBal: "R 129,502.87",
    totalBal: "R 6,719,268.00",
  },
  {
    date: "28 Jul 2025",
    type: "Debit Order (RA Contribution)",
    movement: "Buy",
    units: "44.20",
    unitBal: "1,114.85",
    movValue: "R 5,000.00",
    mktValBal: "R 1,175,000.00",
    cashBal: "R 124,502.87",
    totalBal: "R 6,714,268.00",
  },
];

const formatDate = (date: Date | undefined) => {
  if (!date) return "";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const page = (props: Props) => {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [activeButton, setActiveButton] = useState<string>("90");

  const handleDateFilter = (days: string) => {
    setActiveButton(days);
    const today = new Date();
    const from = new Date();
    from.setDate(today.getDate() - parseInt(days));
    setFromDate(from);
    setToDate(today);
  };

  return (
    <MainLayout header={<Header />}>
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
          {/* Common Header and Filter */}
          <PortfolioHeader />

          {/* Tabs Navigation */}
          <PortfolioTabs />

          {/* Transactions History */}
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <div className="pb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Transaction History
              </h3>
            </div>
            <div className="flex items-center gap-4 flex-wrap pb-6 border-b border-gray-200 mb-6">
              <div className="flex flex-col">
                <Label className="mb-2">From</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {fromDate ? formatDate(fromDate) : "10/14/2025"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={fromDate}
                      onSelect={setFromDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <span className="text-sm font-medium mt-5">-</span>

              <div className="flex flex-col">
                <Label className="mb-2">To</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-40 justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {toDate ? formatDate(toDate) : "01/12/2026"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={toDate}
                      onSelect={setToDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex gap-2 ml-auto">
                <Button
                  variant={activeButton === "30" ? "default" : "outline"}
                  onClick={() => handleDateFilter("30")}
                  className="px-6"
                  size="sm"
                >
                  30 Days
                </Button>
                <Button
                  variant={activeButton === "60" ? "default" : "outline"}
                  onClick={() => handleDateFilter("60")}
                  className="px-6"
                  size="sm"
                >
                  60 Days
                </Button>
                <Button
                  variant={activeButton === "90" ? "default" : "outline"}
                  onClick={() => handleDateFilter("90")}
                  className="px-6"
                  size="sm"
                >
                  90 Days
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto border rounded">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Movement
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Units
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Unit Bal
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Mov. Value
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Mkt Val Bal
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Cash Bal
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                      Total Bal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 text-gray-700"
                    >
                      <td className="px-4 py-3 text-xs">{transaction.date}</td>
                      <td className="px-4 py-3 text-xs">{transaction.type}</td>
                      <td className="px-4 py-3 text-xs">
                        {transaction.movement}
                      </td>
                      <td className="px-4 py-3 text-xs">{transaction.units}</td>
                      <td className="px-4 py-3 text-xs">
                        {transaction.unitBal}
                      </td>
                      <td
                        className={`px-4 py-3 text-xs ${
                          transaction.movValue.includes("-")
                            ? "text-red-600"
                            : transaction.movValue.includes("+")
                            ? "text-green-600"
                            : ""
                        }`}
                      >
                        {transaction.movValue}
                      </td>
                      <td className="px-4 py-3 text-xs">
                        {transaction.mktValBal}
                      </td>
                      <td
                        className={`px-4 py-3 text-xs ${
                          transaction.cashBal.includes("-")
                            ? "text-red-600"
                            : ""
                        }`}
                      >
                        {transaction.cashBal}
                      </td>
                      <td className="px-4 py-3 text-xs font-medium">
                        {transaction.totalBal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default page;
