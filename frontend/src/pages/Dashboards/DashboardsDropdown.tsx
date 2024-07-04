import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface Dashboard {
  uuid: string;
  name: string;
}

interface Props {
  dashboards: Dashboard[];
  selectedDashboardId: string | null;
  onChange: (id: string | null) => void;
}

const DashboardsDropdown: React.FC<Props> = ({ dashboards, selectedDashboardId, onChange }) => {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <Select onValueChange={handleChange} value={selectedDashboardId || ''}>
      <SelectTrigger className="text-3xl w-fit gap-4 mr-4 my-2 py-6 border-none font-bold leading-100">
        <SelectValue placeholder="Select Dashboard" />
      </SelectTrigger>
      <SelectContent className="bg-white text-black">
        {dashboards.map(dashboard => (
          <SelectItem key={dashboard.uuid} value={dashboard.uuid}>
            {dashboard.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DashboardsDropdown;

