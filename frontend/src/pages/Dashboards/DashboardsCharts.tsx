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
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CircularProgress, Box, Typography } from '@mui/material';

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

  console.log('timeRange: ', timeRange);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data: { [key: number]: ChartData[] } = {};

      for (const chart of charts) {
        const result = await getChartData(chart.id);
        console.log('chart.sql_query: ', chart.sql_query);
        console.log('result: ', result);
        
        data[chart.id] = result;
      }

      setChartData(data);
      setLoading(false);
    };

    fetchData();
  }, [charts]);

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
        <Box key={chart.id} mb={4} onClick={() => onClickChart(chart)} style={{ cursor: 'pointer' }}>
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
            {/* Add more chart types as needed */}
          </ResponsiveContainer>
        </Box>
      ))}
    </div>
  );
};

export default DashboardsCharts;
