import React from 'react';
import { AppBar, Toolbar, Button, Tabs, Tab } from '@mui/material';
import logo from '../../assets/sea-quill-logo.png';

const Header: React.FC = () => {
  return (
    <div position="static" className="whtie">
      <Toolbar className="flex justify-between">
        <img src={logo} alt="Logo" className="h-16 mr-4 p-2" />
        <div className="flex-grow">
          <Tabs value={0} className="flex justify-center">
            <Tab label="Dashboard" />
            <Tab label="Chart" />
            <Tab label="Data" />
          </Tabs>
        </div>
        <Button color="primary" variant="contained">RRRRRRR!</Button>
      </Toolbar>
    </div>
  );
};

export default Header;
