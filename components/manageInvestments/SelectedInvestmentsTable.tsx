"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Investment {
  name: string;
  category: string;
  accountNumber: string;
  units: string;
  unitPrice: string;
  marketValue: string;
  onceBuyUnits: string;
  onceBuyValue: string;
  onceSellUnits: string;
  onceSellValue: string;
  monthlyDebitCurrent: string;
  monthlyDebitNew: string;
}

const SelectedInvestmentsTable = () => {
  const [investments, setInvestments] = useState<Investment[]>([
    {
      name: "Standard Bank Pension Fund",
      category: "Pension Funds",
      accountNumber: "SB-PEN-001",
      units: "129870.13",
      unitPrice: "15.40",
      marketValue: "R 2 000 000,00",
      onceBuyUnits: "",
      onceBuyValue: "0.00",
      onceSellUnits: "",
      onceSellValue: "0.00",
      monthlyDebitCurrent: "R 5 000,00",
      monthlyDebitNew: "0.00",
    },
    {
      name: "Retirement Annuity Fund",
      category: "Retirement Funds",
      accountNumber: "SL-RA-882",
      units: "40816.33",
      unitPrice: "24.50",
      marketValue: "R 1 000 000,00",
      onceBuyUnits: "",
      onceBuyValue: "0.00",
      onceSellUnits: "",
      onceSellValue: "0.00",
      monthlyDebitCurrent: "R 2 500,00",
      monthlyDebitNew: "0.00",
    },
    {
      name: "Tax Free Savings Account",
      category: "Tax Free Investments",
      accountNumber: "SL-TFSA-09",
      units: "2400.00",
      unitPrice: "125.00",
      marketValue: "R 300 000,00",
      onceBuyUnits: "",
      onceBuyValue: "0.00",
      onceSellUnits: "",
      onceSellValue: "0.00",
      monthlyDebitCurrent: "R 3 000,00",
      monthlyDebitNew: "0.00",
    },
    {
      name: "International Endowment",
      category: "Endowments",
      accountNumber: "KANE-JE-001",
      units: "11111.11",
      unitPrice: "45.00",
      marketValue: "R 500 000,00",
      onceBuyUnits: "",
      onceBuyValue: "0.00",
      onceSellUnits: "",
      onceSellValue: "0.00",
      monthlyDebitCurrent: "R 0,00",
      monthlyDebitNew: "0.00",
    },
    {
      name: "Direct Unit Trust Investment",
      category: "Direct Investments",
      accountNumber: "SL-UT-554",
      units: "54054.05",
      unitPrice: "18.50",
      marketValue: "R 1 000 000,00",
      onceBuyUnits: "",
      onceBuyValue: "0.00",
      onceSellUnits: "",
      onceSellValue: "0.00",
      monthlyDebitCurrent: "R 1 500,00",
      monthlyDebitNew: "0.00",
    },
    {
      name: "Direct Equity Investment",
      category: "Direct Investments",
      accountNumber: "SHYFT-US-01",
      units: "1785.71",
      unitPrice: "560.00",
      marketValue: "R 1 000 000,00",
      onceBuyUnits: "",
      onceBuyValue: "0.00",
      onceSellUnits: "",
      onceSellValue: "0.00",
      monthlyDebitCurrent: "R 0,00",
      monthlyDebitNew: "0.00",
    },
    {
      name: "Bank Deposit",
      category: "Direct Investments",
      accountNumber: "ACC-998877",
      units: "1000000.00",
      unitPrice: "1.00",
      marketValue: "R 1 000 000,00",
      onceBuyUnits: "",
      onceBuyValue: "0.00",
      onceSellUnits: "",
      onceSellValue: "0.00",
      monthlyDebitCurrent: "R 0,00",
      monthlyDebitNew: "0.00",
    },
  ]);

  const handleInputChange = (
    index: number,
    field: keyof Investment,
    value: string
  ) => {
    const updated = [...investments];
    updated[index][field] = value;
    setInvestments(updated);
  };

  const handleDelete = (index: number) => {
    setInvestments(investments.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    return investments.reduce(
      (acc, inv) => ({
        onceBuyValue:
          acc.onceBuyValue +
          parseFloat(inv.onceBuyValue.replace(/[R,\s]/g, "") || "0"),
        onceSellValue:
          acc.onceSellValue +
          parseFloat(inv.onceSellValue.replace(/[R,\s]/g, "") || "0"),
        monthlyDebitNew:
          acc.monthlyDebitNew +
          parseFloat(inv.monthlyDebitNew.replace(/[R,\s]/g, "") || "0"),
      }),
      { onceBuyValue: 0, onceSellValue: 0, monthlyDebitNew: 0 }
    );
  };

  const totals = calculateTotals();

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 mt-6">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Selected Investments
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead>
              {/* Level 1 Headers */}
              <tr className="border-b border-gray-200">
                <th
                  className="px-3 py-3 text-center bg-blue-50 border-r border-gray-200 font-medium text-primary-dark text-xs"
                  colSpan={4}
                >
                  Current Holdings
                </th>
                <th
                  className="px-3 py-3 text-center bg-green-50 border-r border-gray-200 font-medium text-green-800 text-xs"
                  colSpan={2}
                >
                  Once Off Buy
                </th>
                <th
                  className="px-3 py-3 text-center bg-red-50 border-r border-gray-200 font-medium text-red-800 text-xs"
                  colSpan={2}
                >
                  Once Off Sell
                </th>
                <th
                  className="px-3 py-3 text-center bg-gray-100 border-r border-gray-200 font-medium text-gray-700 text-xs"
                  colSpan={2}
                >
                  Monthly Debit
                </th>
                <th className="px-3 py-3 bg-white"></th>
              </tr>

              {/* Level 2 Headers */}
              <tr className="border-b border-gray-200">
                <th className="px-3 py-2 text-left bg-blue-50 border-r border-gray-200 text-primary-dark font-medium text-xs">
                  Instrument
                </th>
                <th className="px-3 py-2 text-end bg-blue-50 border-r border-gray-200 text-primary-dark font-medium text-xs">
                  Units
                </th>
                <th className="px-3 py-2 text-end bg-blue-50 border-r border-gray-200 text-primary-dark font-medium text-xs">
                  Unit Price
                </th>
                <th className="px-3 py-2 text-end bg-blue-50 border-r border-gray-200 text-primary-dark font-medium text-xs">
                  Market Value
                </th>

                <th className="px-3 py-2 text-end bg-green-50 border-r border-gray-200 text-green-800 font-medium text-xs">
                  Units
                </th>
                <th className="px-3 py-2 text-end bg-green-50 border-r border-gray-200 text-green-800 font-medium text-xs">
                  Value (R)
                </th>

                <th className="px-3 py-2 text-end bg-red-50 border-r border-gray-200 text-red-800 font-medium text-xs">
                  Units
                </th>
                <th className="px-3 py-2 text-end bg-red-50 border-r border-gray-200 text-red-800 font-medium text-xs">
                  Value (R)
                </th>

                <th className="px-3 py-2 text-end bg-gray-100 border-r border-gray-200 text-gray-700 font-medium text-xs">
                  Current
                </th>
                <th className="px-3 py-2 text-end bg-gray-100 border-r border-gray-200 text-gray-700 font-medium text-xs">
                  New
                </th>
                <th className="px-3 py-2 bg-white"></th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-3 py-4">
                    <div>
                      <div className="font-medium text-primary-dark text-sm mb-1">
                        {investment.name}
                      </div>
                      <div className="text-xs text-gray-700">
                        <span className="p-1 bg-gray-200 rounded mr-1">{investment.category}</span> {investment.accountNumber}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-end text-gray-700">
                    {investment.units}
                  </td>
                  <td className="px-3 py-4 text-end text-gray-700">
                    {investment.unitPrice}
                  </td>
                  <td className="px-3 py-4 text-end text-gray-700">
                    {investment.marketValue}
                  </td>

                  <td className="px-3 py-4 text-end bg-green-50/50">
                    <Input
                      type="number"
                      value={investment.onceBuyUnits}
                      onChange={(e) =>
                        handleInputChange(index, "onceBuyUnits", e.target.value)
                      }
                      className="w-24 ml-auto h-9 rounded text-end border-gray-300"
                      placeholder="-"
                    />
                  </td>
                  <td className="px-3 py-4 text-end bg-green-50/50">
                    <Input
                      type="number"
                      value={investment.onceBuyValue}
                      onChange={(e) =>
                        handleInputChange(index, "onceBuyValue", e.target.value)
                      }
                      className="w-24 ml-auto h-9 rounded text-end border-gray-300"
                      placeholder="0.00"
                    />
                  </td>

                  <td className="px-3 py-4 text-end bg-red-50/50">
                    <Input
                      type="number"
                      value={investment.onceSellUnits}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "onceSellUnits",
                          e.target.value
                        )
                      }
                      className="w-24 ml-auto h-9 rounded text-end border-gray-300"
                      placeholder="-"
                    />
                  </td>
                  <td className="px-3 py-4 text-end bg-red-50/50">
                    <Input
                      type="number"
                      value={investment.onceSellValue}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "onceSellValue",
                          e.target.value
                        )
                      }
                      className="w-24 ml-auto h-9 rounded text-end border-gray-300"
                      placeholder="0.00"
                    />
                  </td>

                  <td className="px-3 py-4 text-end text-gray-700 bg-gray-100">
                    {investment.monthlyDebitCurrent}
                  </td>
                  <td className="px-3 py-4 text-end bg-gray-100">
                    <Input
                      type="number"
                      value={investment.monthlyDebitNew}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "monthlyDebitNew",
                          e.target.value
                        )
                      }
                      className="w-20 h-9 rounded text-end border-gray-300"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="px-3 py-4 text-center bg-white">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}

              {/* Totals Row */}
              <tr className="bg-gray-100 font-medium border-t-2 border-gray-300">
                <td className="px-3 py-4 text-end" colSpan={4}>
                  <span className="text-gray-900 text-sm font-medium">TOTALS:</span>
                </td>
                <td
                  className="px-3 py-4 text-end"
                  colSpan={2}
                >
                  <span className="text-green-700 text-base font-bold">
                    R 0,00
                  </span>
                </td>
                <td className="px-3 py-4 text-end" colSpan={2}>
                  <span className="text-red-700 text-base font-bold">
                    R 0,00
                  </span>
                </td>
                <td
                  className="px-3 py-4 text-end"
                  colSpan={2}
                >
                  <span className="text-[#003FCA] text-base font-bold">
                    R 0,00
                  </span>
                </td>
                <td className="px-3 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
          <Button size="md">
            Review & Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectedInvestmentsTable;
