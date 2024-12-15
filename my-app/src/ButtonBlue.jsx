import React, { useState } from 'react'
import './button.css'

const Button = ({onClick}) => {
  const [isCardVisible, setIsCardVisible] = useState(false);

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  return (
    <div className='relative'>
      <button
      className="bg-blue-800 rounded-md px-10 py-3 sdw-blue transition transform hover:-translate-y-1 hover:scale-105 hover:bg-blue-700"
      onClick={onClick}
      >
        <span className="text-center text-white outfit-400 hover:outfit-700">Watch this!</span>
      </button>

      {isCardVisible && (
        <>

        </>
      )}
    </div>
  )
}

export default Button