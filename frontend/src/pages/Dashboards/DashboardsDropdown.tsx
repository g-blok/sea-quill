import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface Dashboard {
  id: number;
  name: string;
}

interface Props {
  dashboards: Dashboard[];
  selectedDashboardId: number | null;
  onChange: (id: number | null) => void;
}

const DashboardsDropdown: React.FC<Props> = ({ dashboards, selectedDashboardId, onChange }) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onChange(event.target.value as number);
  };

  return (
    <FormControl className="min-w-80 max-w-80 w-80">
      <InputLabel id="dashboard-select-label">Select Dashboard</InputLabel>
      <Select
        labelId="dashboard-select-label"
        value={selectedDashboardId || ''}
        onChange={handleChange}
      >
        {dashboards.map(dashboard => (
          <MenuItem key={dashboard.id} value={dashboard.id}>
            {dashboard.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DashboardsDropdown;
