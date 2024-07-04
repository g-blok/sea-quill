import React, { useEffect, useState } from 'react';
import ChartsHeader from './ChartsHeader';
import { getCharts } from '../../services/apiService';

const ChartsPage: React.FC = () => {

  return (
    <div className="p-10 pr-20">
      <ChartsHeader />
    </div>
  );
};

export default ChartsPage;
