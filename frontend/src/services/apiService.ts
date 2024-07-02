import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getDashboards = async () => {
  const response = await api.get('/dashboards');
  return response.data;
};

export const getCharts = async () => {
  const response = await api.get('/charts');
  return response.data;
};

export const getChartData = async (chartId: number) => {
  const response = await api.get(`/charts/${chartId}`);
  return response.data;
};
