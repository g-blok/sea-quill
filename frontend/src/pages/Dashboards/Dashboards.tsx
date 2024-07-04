import React, { useEffect, useState } from 'react';
import { getDashboards, getCharts } from '../../services/apiService';
import DashboardsDropdown from './DashboardsDropdown';
import DashboardsCharts from './DashboardsCharts';
import { getDateRange } from '../../utils/dateRangeUtils';
import DateRangeSelector from './DashboardsTimeRangeSelect';

interface Dashboard {
  uuid: string;
  name: string;
  initial_date_range: string;
}

interface Chart {
  id: number;
  dashboard_id: string;
  sql_query: string;
}

interface DashboardProps {
  name: string;
  containerStyle: React.CSSProperties;
  onClickDashboardItem: (dashboardItem: Chart) => void;
}

const DashboardPage: React.FC<DashboardProps> = ({ name, containerStyle, onClickDashboardItem }) => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [selectedDashboardId, setSelectedDashboardId] = useState<string | null>(null);
  const [filteredCharts, setCharts] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState<{ start: string, end: string }>({ start: '', end: '' });
  const [initialDateRange, setInitialDateRange] = useState<string>('');

  useEffect(() => {
    const fetchDashboards = async () => {
      const data = await getDashboards();
      setDashboards(data);
    };

    fetchDashboards();
  }, []);

  const handleDashboardChange = async (uuid: string | null) => {
    setSelectedDashboardId(uuid);

    if (uuid !== null) {
      const charts: Chart[] = await getCharts();
      const filteredCharts = charts.filter(chart => chart.dashboard_id === uuid)
      setCharts(filteredCharts);

      const selectedDashboard = dashboards.find(dashboard => dashboard.uuid === uuid);
      if (selectedDashboard) {
        setInitialDateRange(selectedDashboard.initial_date_range);
        const initialRange = getDateRange(selectedDashboard.initial_date_range);

        setDateRange({ start: initialRange[0].toISOString().split('T')[0], end: initialRange[1].toISOString().split('T')[0] });
      }
    } else {
      setCharts([]);
    }
  };

  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    setDateRange({ start: startDate.toISOString().split('T')[0], end: endDate.toISOString().split('T')[0] });
  };

  return (
    <div className="p-10 pr-20" style={containerStyle}>
      <DashboardsDropdown
        dashboards={dashboards}
        selectedDashboardId={selectedDashboardId}
        onChange={handleDashboardChange}
      />
      {selectedDashboardId && (
        <DateRangeSelector onChange={handleDateRangeChange} initialDateRange={initialDateRange}/>
      )}
      {dateRange && (
        <DashboardsCharts charts={filteredCharts} dateRange={dateRange} onClickChart={onClickDashboardItem} />
      )}
    </div>
  );
};

export default DashboardPage;
