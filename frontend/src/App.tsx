import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import DashboardsPage from './pages/Dashboards/Dashboards';
import ChartsPage from './pages/Charts/Charts';
import DataPage from './pages/Data/Data';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/dashboards" element={<DashboardsPage />} />
          <Route path="/charts" element={<ChartsPage />} />
          <Route path="/data" element={<DataPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
