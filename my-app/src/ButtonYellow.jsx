import React, { useState } from 'react'
import './button.css'

const Button = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);

  return (
    <div className='relative'>
      <button
      className="bg-yellow-800 rounded-md px-10 py-3 sdw-yellow transition transform hover:-translate-y-1 hover:scale-105 hover:bg-yellow-700"
      onClick={() => {}}
      >
        <span className="text-center text-white outfit-400 hover:outfit-700">Movie List</span>
      </button>

      {isCardVisible && (
        <>

        </>
      )}
    </div>
  )
}

export default Button