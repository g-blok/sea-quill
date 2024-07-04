import React from 'react';
import { ChevronDown } from "lucide-react"

const ChartsHeader: React.FC = () => {

  return (
    <div className="flex items-center h-10 my-2 pl-6" >
      <div className="text-3xl w-fit gap-4 mr-4 my-2 py-6 border-none font-bold leading-100" >Collection</div>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </div>
  );
};

export default ChartsHeader;

