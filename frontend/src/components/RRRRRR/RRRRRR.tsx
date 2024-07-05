import React, { useState } from 'react';
import SHIP from '../../assets/ship.png';

interface Ship {
    id: number;
}

const PirateButton: React.FC = () => {
    const [ships, setShips] = useState<Ship[]>([]);
    const [shipId, setShipId] = useState(0);

  const handleClick = () => {
    setShips([...ships, { id: shipId }]);
    setShipId(shipId + 1);
    setTimeout(() => {
        setShips((ships) => ships.filter((ship) => ship.id !== shipId));
    }, 30000);
  };

  return (
    <div className="flex flex-col items-center relative py-6">
      <button
        className="bg-secondary-dark hover:bg-secondary text-white font-bold rounded-xl px-10 h-12"
        onClick={handleClick}
      >
        RRRRRR!
      </button>
      {ships.map((ship) => (
        <img
          src={SHIP}
          alt="Pirate Ship"
          className="fixed bottom-0 left-0 w-24 animate-sail"
        />
      ))}
    </div>
  );
};

export default PirateButton;
