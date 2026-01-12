'use client';

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';

interface FeeData {
  account: string;
  institution: string;
  domicile: string;
  investmentType: string;
  managementFee: string;
  platformFee: string;
  advisoryFee: string;
  totalFee: string;
  initialFee: string;
  annualCost: string;
}

const formatDate = (date: Date | undefined) => {
  if (!date) return '';
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const FeeBreakdownTable: React.FC = () => {
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [activeButton, setActiveButton] = useState<string>('90');

  const handleDateFilter = (days: string) => {
    setActiveButton(days);
    const today = new Date();
    const from = new Date();
    from.setDate(today.getDate() - parseInt(days));
    setFromDate(from);
    setToDate(today);
  };

  const feeData: FeeData[] = [
    {
      account: 'Retirement Annuity',
      institution: 'Old Mutual',
      domicile: 'Local',
      investmentType: 'Annuity',
      managementFee: '1.00%',
      platformFee: '0.00%',
      advisoryFee: '0.30%',
      totalFee: '1.30%',
      initialFee: '0.00%',
      annualCost: 'R 12,870',
    },
    {
      account: 'Preservation Fund',
      institution: 'Allan Gray',
      domicile: 'Local',
      investmentType: 'Pension',
      managementFee: '0.70%',
      platformFee: '0.00%',
      advisoryFee: '0.30%',
      totalFee: '1.00%',
      initialFee: '0.00%',
      annualCost: 'R 8,850',
    },
    {
      account: 'Tax-Free Savings',
      institution: 'Satrix',
      domicile: 'Local',
      investmentType: 'TFSA',
      managementFee: '0.10%',
      platformFee: '0.00%',
      advisoryFee: '0.30%',
      totalFee: '0.40%',
      initialFee: '0.00%',
      annualCost: 'R 260',
    },
    {
      account: 'Domestic Endowment',
      institution: 'Liberty',
      domicile: 'Local',
      investmentType: 'Endowment',
      managementFee: '1.30%',
      platformFee: '0.30%',
      advisoryFee: '0.30%',
      totalFee: '1.90%',
      initialFee: '0.00%',
      annualCost: 'R 23,750',
    },
    {
      account: 'International Endowment',
      institution: 'Allan Gray',
      domicile: 'Offshore',
      investmentType: 'Endowment',
      managementFee: '1.40%',
      platformFee: '0.30%',
      advisoryFee: '0.30%',
      totalFee: '2.00%',
      initialFee: '0.00%',
      annualCost: 'R 25,000',
    },
    {
      account: 'Unit Trust',
      institution: 'Coronation',
      domicile: 'Local',
      investmentType: 'Unit Trust',
      managementFee: '1.00%',
      platformFee: '0.00%',
      advisoryFee: '0.30%',
      totalFee: '1.30%',
      initialFee: '0.00%',
      annualCost: 'R 6,500',
    },
    {
      account: 'Share Portfolio',
      institution: 'Standard Bank',
      domicile: 'Local',
      investmentType: 'Equity',
      managementFee: '0.00%',
      platformFee: '0.20%',
      advisoryFee: '0.00%',
      totalFee: '0.20%',
      initialFee: '0.00%',
      annualCost: 'R 920',
    },
  ];

  // Calculate totals
  const totalAnnualCost = feeData.reduce((sum, item) => {
    return sum + parseFloat(item.annualCost.replace(/[R,\s]/g, ''));
  }, 0);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <div className="pb-6">
        <h3 className="text-lg font-medium text-gray-900">
          Detailed Fee Breakdown
        </h3>
      </div>
      <div className="overflow-x-auto border rounded">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Account
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Domicile
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Inv. Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Mgmt %
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Plat %
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Adv %
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Tot %
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Initial %
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Annual Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {feeData.map((row, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 text-gray-700"
              >
                <td className="px-4 py-3 text-xs">
                  <div>
                    <div className="font-medium text-gray-900">{row.account}</div>
                    <div className="text-gray-500">{row.institution}</div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs">{row.domicile}</td>
                <td className="px-4 py-3 text-xs">{row.investmentType}</td>
                <td className="px-4 py-3 text-xs">{row.managementFee}</td>
                <td className="px-4 py-3 text-xs">{row.platformFee}</td>
                <td className="px-4 py-3 text-xs">{row.advisoryFee}</td>
                <td className="px-4 py-3 text-xs">{row.totalFee}</td>
                <td className="px-4 py-3 text-xs">{row.initialFee}</td>
                <td className="px-4 py-3 text-xs font-medium">{row.annualCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeeBreakdownTable;
