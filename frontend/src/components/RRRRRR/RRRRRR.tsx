import React, { useState } from 'react';
import ship from '../../assets/ship.png';

const PirateButton: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300000);
  };

  return (
    <div className="flex flex-col items-center relative">
      <button
        className="bg-secondary-dark hover:bg-secondary text-white font-bold rounded-xl px-10 h-12"
        onClick={handleClick}
      >
        RRRRRR!
      </button>
      {animate && (
        <img
          src={ship}
          alt="Pirate Ship"
          className="fixed bottom-0 left-0 w-24 animate-sail"
        />
      )}
    </div>
  );
};

export default PirateButton;
