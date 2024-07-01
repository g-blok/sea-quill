import React from 'react';
import Header from './components/Header/Header';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {/* Other components */}
    </ThemeProvider>
  );
};

export default App;
