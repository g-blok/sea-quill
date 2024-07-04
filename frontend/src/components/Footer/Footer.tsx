import React, { useState, useEffect } from 'react';
import { PIRATE_SAYINGS } from '../../common/types';

const Footer: React.FC = () => {
    const [randomItem, setRandomItem] = useState<string>('');
  
    useEffect(() => {
      const randomIndex = Math.floor(Math.random() * PIRATE_SAYINGS.length);
      setRandomItem(PIRATE_SAYINGS[randomIndex]);
    }, []);
  
    return (
      <div className="text-center text-secondary p-4">
        {randomItem}
      </div>
    );
  };
  
export default Footer;

