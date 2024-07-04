import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { DateRangePicker } from '../../components/ui/date-range-picker';
import { TIME_RANGE_OPTIONS } from '../../common/types';
import { getDateRange } from '../../utils/dateRangeUtils';

interface DateRangeSelectorProps {
  initialDateRange: string;
  onChange: (startDate: Date, endDate: Date) => void;
}

interface DateRange {
  from: Date
  to: Date | undefined
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ initialDateRange, onChange }) => {
  const [selectedRange, setSelectedRange] = useState(initialDateRange);  
  const [customStartDate, setCustomStartDate] = useState<Date | null>(null);
  const [customEndDate, setCustomEndDate] = useState<Date | null>(null);
  const dateRange = getDateRange(selectedRange);

  useEffect(() => {
    setSelectedRange(initialDateRange);
  }, [initialDateRange])

  const handleDateCategoryChange = (dateRangeId: string) => {
    const [start, end] = getDateRange(dateRangeId);
    setCustomStartDate(null);
    setCustomEndDate(null);
    setSelectedRange(dateRangeId);
    onChange(start, end);
  };

  const handleCustomDateChange = (range: DateRange) => {
    if (!range?.from && !range?.to) {
      return;
    }
    const start: Date  = range.from;
    const end: Date = range.to;
    setCustomStartDate(start);
    setCustomEndDate(end);
    onChange(start, end);
  };

  return (
    <div className="flex mt-4 items-center">
      <Select onValueChange={(dateRangeId) => handleDateCategoryChange(dateRangeId)} value={selectedRange}>
        <SelectTrigger className="w-[240px] mr-4 h-12 px-8 py-0 rounded-2xl border-black border-2 font-bold">
          <SelectValue placeholder="Select Date Range" />
        </SelectTrigger>
        <SelectContent className="bg-white text-black">
          {TIME_RANGE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
          <SelectItem value="CUSTOM">Custom</SelectItem>
        </SelectContent>
      </Select>

      {selectedRange === 'CUSTOM' && (
        <DateRangePicker
          onUpdate={({ range }) => handleCustomDateChange(range)}
          initialDateFrom={customStartDate || dateRange[0]}
          initialDateTo={customEndDate || dateRange[1]}
          align="start"
          locale="en-US"
          showCompare={false}
        />
      )}
      {selectedRange !== 'CUSTOM' && (
        <div className="flex flex-col">
          <p className="text-gray-300">Start {dateRange[0].toLocaleDateString()}</p>
          <p className="text-gray-300">End {dateRange[1].toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;
