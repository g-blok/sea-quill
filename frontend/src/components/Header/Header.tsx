import React from 'react';
import { NavLink  } from 'react-router-dom';
import logo from '../../assets/sea-quill-brand.png';
import RRRRRR from '../RRRRRR/RRRRRR';

const Header: React.FC = () => {
  return (
    <div position="static" className="white mr-14">
      <div className="flex justify-between">
        <img src={logo} alt="Logo" className="h-20 mr-4 p-2" />
        <div className="flex-grow">
          <nav className="flex justify-center gap-4 p-6 text-xl">
            <NavLink
              to="/dashboards"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl hover:opacity-60 ${
                  isActive ? 'bg-secondary-light text-white' : 'text-black'
                }`
              }
            >
              dashboards
            </NavLink>
            <NavLink
              to="/charts"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl hover:opacity-60 ${
                  isActive ? 'bg-secondary-light text-white' : 'text-black'
                }`
              }
            >
              charts
            </NavLink>
            <NavLink
              to="/data"
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl hover:opacity-60 ${
                  isActive ? 'bg-secondary-light text-white' : 'text-black'
                }`
              }
            >
              data
            </NavLink>
          </nav>
        </div>
        <RRRRRR />
      </div>
    </div>
  );
};

export default Header;
