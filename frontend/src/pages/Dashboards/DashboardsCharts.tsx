import React, { useEffect, useState, useCallback } from 'react';
import { getChartData } from '../../services/apiService';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { CircularProgress, Box } from '@mui/material';
import ChartModal from './ChartModal';
import debounce from 'lodash.debounce';

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

interface DataCollection {
  [chartId: string]: {
    data: ChartData[];
    startDate: string;
    endDate: string;
  };
}

interface Props {
  charts: Chart[];
  dateRange: { start: string, end: string };
  onClickChart: (chart: Chart) => void;
}

const DashboardsCharts: React.FC<Props> = ({ charts, dateRange, onClickChart }) => {
  const [dataCollection, setDataCollection] = useState<DataCollection>({});
  const [loading, setLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState<Chart | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = useCallback(
    debounce(async () => {
      if (!dateRange?.start?.length || !dateRange?.end?.length) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const data: DataCollection = {};

      for (const chart of charts) {
        let chartDataRows: ChartData[] = []
        if (hasCachedData(chart)) {
          chartDataRows = filterData(dataCollection[chart.id].data, dateRange.start, dateRange.end, chart)
        } else {
          chartDataRows = await getChartData(chart.id, dateRange);
          dataCollection[chart.id] = {
            data: chartDataRows,
            startDate: dateRange.start,
            endDate: dateRange.end,
          }
        }
        let sortedChartDataRows: ChartData[] = [];
        if (chartDataRows?.length) {
          sortedChartDataRows = chartDataRows
          .sort((a: ChartData, b: ChartData) =>
            a[chart.x_axis_field] < b[chart.x_axis_field] ? -1 : a[chart.x_axis_field] > b[chart.x_axis_field] ? 1 : 0
          );
        }
        data[chart.id] = {
          data: sortedChartDataRows,
          startDate: dateRange.start,
          endDate: dateRange.end,
        };
      }
      setDataCollection(data);
      setLoading(false);
    }, 300),
    [charts, dateRange]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const hasCachedData = (chart: Chart) => {
    const requiresNewFetch = /group by/i.test(chart.sql_query);
    const cachedStartBeforeFilterStart = new Date(dataCollection[chart.id]?.startDate) <= new Date(dateRange.start);
    const cachedEndAfterFilterEnd = new Date(dataCollection[chart.id]?.endDate) <= new Date(dateRange.end);
    if (!requiresNewFetch && cachedStartBeforeFilterStart && cachedEndAfterFilterEnd) {
      return true;
    }
    return false;
  }

  const filterData = (data: ChartData[], startDate: string, endDate: string, chart: Chart) => {
    if (!chart.date_field_field) {
      return data;
    }
    // Filter data on client side based on the date range
    return data.filter((item) => {
      const date = new Date(item[chart.date_field_field]);
      return date >= new Date(startDate) && date <= new Date(endDate);
    });
  };

  const getFilteredData = (chart: Chart) => {
    return dataCollection[chart.id]?.data;
  };

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
    <div className="grid grid-cols-2 gap-10 mt-8">
      {charts.map((chart) => (
        <Box
          key={chart.id}
          mb={4}
          onClick={() => handleChartClick(chart)}
          style={{ cursor: 'pointer', transition: 'transform 0.2s', ':hover': { transform: 'scale(1.05)' } }}
        >
          <div className="ml-8 font-bold text-xl -mb-1">
            {chart.name}
          </div>
          <ResponsiveContainer width="100%" height={400} className="border-2 border-black rounded-2xl p-4 inline-block" >
            {chart.chart_type === 'line' && !!getFilteredData(chart)?.length && (
              <LineChart
                data={getFilteredData(chart)}
                margin={{ top: 30, right: 30, left: 20, bottom: 60 }}
              >
                <XAxis dataKey={chart.x_axis_field} label={{ value: chart.x_axis_field, position: 'insideBottom', offset: -10 }} />
                <YAxis label={{ value: chart.y_axis_field, angle: -90, position: 'insideLeft', offset: 0 }} />
                <Tooltip />
                <Line type="monotone" dataKey={chart.y_axis_field} stroke="#8884d8" strokeWidth={4} activeDot={{ r: 8 }} />
              </LineChart>
            )}
            {chart.chart_type === 'bar' && !!getFilteredData(chart)?.length && (
              <BarChart
                data={getFilteredData(chart)}
                margin={{ top: 30, right: 30, left: 20, bottom: 60 }}
              >
                <XAxis dataKey={chart.x_axis_field} label={{ value: chart.x_axis_field, position: 'insideBottom', offset: -10 }} />
                <YAxis label={{ value: chart.y_axis_field, angle: -90, position: 'insideLeft', offset: 0 }} />
                <Tooltip />
                <Bar dataKey={chart.y_axis_field} fill="#8884d8" />
              </BarChart>
            )}
            {!getFilteredData(chart)?.length && (
              <div className="flex m-auto justify-center items-center h-full text-primary text-xl">
                no data for this period
              </div>
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
