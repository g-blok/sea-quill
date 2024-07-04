import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import DashboardsPage from './pages/Dashboards/Dashboards';
import ChartsPage from './pages/Charts/Charts';
import DataPage from './pages/Data/Data';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './tailwind.css';

const App: React.FC = () => {
  return (
    <div className="right-border min-h-screen">
      <ThemeProvider theme={theme}>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
              <Routes>
                <Route path="/dashboards" element={<DashboardsPage />} />
                <Route path="/charts" element={<ChartsPage />} />
                <Route path="/data" element={<DataPage />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
