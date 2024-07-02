import React, { useEffect, useState } from 'react';
import { getDashboards, getCharts } from '../../services/apiService';
import DashboardsDropdown from './DashboardsDropdown';
import DashboardsCharts from './DashboardsCharts';
import DashboardsTimeRangeSelect from './DashboardsTimeRangeSelect';

interface Dashboard {
  id: number;
  name: string;
}

interface Chart {
  id: number;
  dashboard_id: number;
  sql_query: string;
}

interface DashboardProps {
  name: string;
  containerStyle: React.CSSProperties;
  onClickDashboardItem: (dashboardItem: Chart) => void;
}

const DashboardPage: React.FC<DashboardProps> = ({ name, containerStyle, onClickDashboardItem }) => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [selectedDashboardId, setSelectedDashboardId] = useState<number | null>(null);
  const [filteredCharts, setCharts] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<string>('currentMonth');

  useEffect(() => {
    const fetchDashboards = async () => {
      const data = await getDashboards();
      // setDashboards(data.filter((dashboard: Dashboard) => dashboard.name === name));
      setDashboards(data);
    };

    fetchDashboards();
  }, []);

  const handleDashboardChange = async (id: number | null) => {
    setSelectedDashboardId(id);

    if (id !== null) {
      const charts: Chart[] = await getCharts();
      const filteredCharts = charts.filter(chart => chart.dashboard_id === selectedDashboardId)
      // const filteredCharts = charts
      setCharts(filteredCharts);
    } else {
      setCharts([]);
    }
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  return (
    <div className="pt-20 pl-10" style={containerStyle}>
      <DashboardsDropdown
        dashboards={dashboards}
        selectedDashboardId={selectedDashboardId}
        onChange={handleDashboardChange}
      />
      <DashboardsTimeRangeSelect onChange={handleTimeRangeChange} />
      <DashboardsCharts charts={filteredCharts} timeRange={timeRange} onClickChart={onClickDashboardItem} />
    </div>
  );
};

export default DashboardPage;
