'use client';

import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from 'lucide-react';
import { format, subDays } from 'date-fns';

const DateRangePicker: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('30');
  const [customDateRange, setCustomDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ from: undefined, to: undefined });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const quickOptions = [
    { label: '30 Days', value: '30' },
    { label: '60 Days', value: '60' },
    { label: '90 Days', value: '90' },
  ];

  const handleQuickSelect = (value: string) => {
    setSelectedOption(value);
    setCustomDateRange({ from: undefined, to: undefined });
  };

  const handleCustomDateSelect = () => {
    setSelectedOption('custom');
  };

  const formatDateRange = () => {
    if (customDateRange.from && customDateRange.to) {
      return `${format(customDateRange.from, 'dd MMM yyyy')} - ${format(customDateRange.to, 'dd MMM yyyy')}`;
    } else if (customDateRange.from) {
      return format(customDateRange.from, 'dd MMM yyyy');
    }
    return 'Select date range';
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Time Period:</span>
        
        {/* Quick Select Buttons */}
        <div className="flex gap-2">
          {quickOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleQuickSelect(option.value)}
              className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${
                selectedOption === option.value
                  ? 'bg-[#0062E1] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Calendar Picker */}
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`justify-start text-left font-normal ${
                selectedOption === 'custom' ? 'border-[#0062E1] text-[#0062E1]' : ''
              }`}
              onClick={handleCustomDateSelect}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {customDateRange.from && customDateRange.to ? (
                formatDateRange()
              ) : (
                <span>Custom Range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={{
                from: customDateRange.from,
                to: customDateRange.to,
              }}
              onSelect={(range) => {
                setCustomDateRange({
                  from: range?.from,
                  to: range?.to,
                });
                if (range?.from && range?.to) {
                  setIsCalendarOpen(false);
                }
              }}
              numberOfMonths={2}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DateRangePicker;
