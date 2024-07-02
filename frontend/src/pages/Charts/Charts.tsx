import React, { useEffect, useState } from 'react';
import { getCharts } from '../../services/apiService';
import { Typography } from '@mui/material';

interface Chart {
  id: number;
  sqlquery: string;
}

const ChartsPage: React.FC = () => {
  const [charts, setCharts] = useState<Chart[]>([]);

  useEffect(() => {
    const fetchCharts = async () => {
      const data = await getCharts();
      setCharts(data);
    };

    fetchCharts();
  }, []);

  return (
    <div>
      {charts.map(chart => (
        <Typography key={chart.id} variant="body1">
          {chart.sqlquery}
        </Typography>
      ))}
    </div>
  );
};

export default ChartsPage;
