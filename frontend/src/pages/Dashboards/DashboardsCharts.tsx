import React, { useEffect, useState } from 'react';
import { getChartData } from '../../services/apiService';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CircularProgress, Box, Typography } from '@mui/material';
import ChartModal from './ChartModal';


interface Chart {
  id: number;
  name: string;
  dashboard_id: number;
  chart_type: string;
  sql_query: string;
  x_axis_field: string;
  y_axis_field: string;
  date_field_table: string;
  date_field_field: string;
}

interface ChartData {
  [key: string]: any;
}

interface Props {
  charts: Chart[];
  timeRange: string;
  onClickChart: (chart: Chart) => void;
}

const DashboardsCharts: React.FC<Props> = ({ charts, timeRange, onClickChart }) => {
  const [chartData, setChartData] = useState<{ [key: number]: ChartData[] }>({});
  const [loading, setLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState<Chart | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data: { [key: number]: ChartData[] } = {};

      for (const chart of charts) {
        data[chart.id] = [];
        const result = await getChartData(chart.id);
        
        if (result?.length) {
          data[chart.id] = result
        };
      }

      setChartData(data);
      setLoading(false);
    };

    fetchData();
  }, [charts, timeRange]);


  const handleChartClick = (chart: Chart) => {
    setSelectedChart(chart);
    setModalOpen(true);
    onClickChart(chart);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {charts.map((chart) => (
        <Box
          key={chart.id}
          mb={4}
          onClick={() => handleChartClick(chart)}
          style={{ cursor: 'pointer', transition: 'transform 0.2s', ':hover': { transform: 'scale(1.05)' } }}
        >
          <Typography variant="h6" gutterBottom>
            {chart.name}
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            {chart.chart_type === 'line' && (
              <LineChart
                data={chartData[chart.id]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={chart.x_axis_field} />
                <YAxis />
                <Legend />
                <Line type="monotone" dataKey={chart.y_axis_field} stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            )}
            {chart.chart_type === 'bar' && (
              <BarChart
                data={chartData[chart.id]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={chart.x_axis_field} />
                <YAxis />
                <Legend />
                <Bar dataKey={chart.y_axis_field} fill="#8884d8" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </Box>
      ))}
      {selectedChart && (
        <ChartModal open={modalOpen} onClose={handleClose} chart={selectedChart} />
      )}
    </div>
  );
};

export default DashboardsCharts;
