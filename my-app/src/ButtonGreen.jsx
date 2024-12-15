import React, { useState } from 'react';
import './button.css';

const Button = ({ selectedFavorites = []}) => {
  const [isCardVisible, setIsCardVisible] = useState(false);

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  return (
    <div className="relative">
      <button
        className="bg-green-800 rounded-md px-10 py-3 sdw-green transition transform hover:-translate-y-1 hover:scale-105 hover:bg-green-700"
        onClick={toggleCardVisibility}
      >
        <span className="text-center text-white outfit-400 hover:outfit-700">
          Liked Movies
        </span>
      </button>

      {/* Render liked movies in the card */}
      {isCardVisible && (
        <>
        </>
      )}
    </div>
  );
};

export default Button;
