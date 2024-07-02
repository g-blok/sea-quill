import { log } from 'console';
import { Request, Response } from 'express';
const supabase = require('../database/supabaseClient');

const getCharts = async (req: Request, res: Response) => {
  try {
    // Fetch all charts from Supabase
    const { data: charts, error } = await supabase
      .from('charts')
      .select('*');

    if (error) {
      throw error;
    }
    console.log('charts: ', charts)
    res.json(charts);
  } catch (error) {
    console.error('Error fetching charts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getChartData = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Fetch the chart's SQL query using Supabase
    const { data: charts, error } = await supabase
      .from('charts')
      .select('sql_query')
      .eq('id', id);

    console.log('charts data: ', charts)
    if (error) {
      throw error;
    }

    if (charts.length === 0) {
      return res.status(404).json({ error: 'Chart not found' });
    }

    const chart = charts[0];
    console.log('chart.sql_query: ', chart.sql_query)
    // Execute the chart's SQL query using Supabase
    const { data: results, error: queryError } = await supabase.rpc('execute_sql', {
      query: chart.sql_query,
    });
    console.log('results data: ', results)
    if (queryError) {
      throw queryError;
    }

    res.json(results);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { getCharts, getChartData };
