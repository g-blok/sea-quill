import React, { useEffect } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem
} from '../../components/ui/select';

interface TimeRangeSelectProps {
  onChange: (value: string) => void;
}

const DashboardsTimeRangeSelect: React.FC<TimeRangeSelectProps> = ({ onChange }) => {
  const options = [
    { value: 'LAST_90_DAYS', label: 'Last 90 Days' },
    { value: 'LAST_60_DAYS', label: 'Last 60 Days' },
    { value: 'LAST_30_DAYS', label: 'Last 30 Days' },
    { value: 'CURRENT_MONTH', label: 'Current Month' },
  ];

  useEffect(() => {
    onChange('CURRENT_MONTH');
  }, [onChange]);

  return (
    <Select defaultValue="currentMonth" onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a time range" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Time Range</SelectLabel>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DashboardsTimeRangeSelect;
