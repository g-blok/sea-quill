import React, { useEffect, useState } from 'react';
import { getDashboards, getCharts } from '../../services/apiService';
import DashboardsDropdown from './DashboardsDropdown';
import DashboardsCharts from './DashboardsCharts';
import DashboardsTimeRangeSelect from './DashboardsTimeRangeSelect';

interface Dashboard {
  uuid: number;
  name: string;
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
  const [timeRange, setTimeRange] = useState<string>('currentMonth');

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
