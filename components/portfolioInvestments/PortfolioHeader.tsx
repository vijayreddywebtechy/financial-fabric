'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Info } from 'lucide-react';
import { Label } from '@/components/ui/label';
import MultiSelect from '@/components/dynamic/MultiSelect';

const PortfolioHeader: React.FC = () => {
  return (
    <>
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium mb-1">
          Your Investments
        </h2>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="text-sm sm:text-base text-gray-600">
            <span>Portfolio ID: 115909297</span> •{" "}
            <span>Last Updated: 9 January 2026</span>
          </div>
          <Button
            variant="outline"
            className="rounded-full bg-blue-50 pointer-events-none"
            size="sm"
          >
            High growth strategy
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full flex items-center gap-2"
              >
                <Info className="h-5 w-5" stroke="#0062E1" />
                <span className="text-sm">Est: annual cost: 1.15%</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-64 p-2" align="start">
              <DropdownMenuLabel className="text-sm text-gray-800 font-medium">
                Cost Breakdown
              </DropdownMenuLabel>

              <DropdownMenuItem
                className="
                    cursor-default
                    focus:bg-transparent
                    hover:bg-transparent
                    active:bg-transparent
                "
              >
                <div className="w-full text-xs text-gray-600">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span>Investment Mgmt</span>
                    <span>0.57%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span>Advice Fee</span>
                    <span>0.33%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span>Platform/Admin</span>
                    <span>0.25%</span>
                  </div>
                  <div className="flex justify-between py-2 font-medium text-primary-dark border-b border-gray-100">
                    <span>Total EAC</span>
                    <span>1.15%</span>
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground">
                    *Effective Annual Cost based on weighted average of
                    selected assets
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filter Accounts */}
      <div className="border border-gray-200 p-4 sm:p-6 bg-white rounded-md mb-6">
        <div className="max-w-lg">
          <Label className="block mb-2">Filter Accounts</Label>
          <MultiSelect />
        </div>
      </div>
    </>
  );
};

export default PortfolioHeader;
