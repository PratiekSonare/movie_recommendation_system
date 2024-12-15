import React, { useState, useEffect } from 'react';
import './index.css'; 

const Recommended = () => {
  const [recommendations, setRecommendedations] = useState([]);

    // Fetch liked movies function
    const fetchRecommended = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/recommend", {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        setRecommendedations(data);
      } catch (error) {
        console.error('Error fetching liked movies:', error);
      }
    };
  
    useEffect(() => {
      fetchRecommended(); // Fetch the initial list of liked movies
  
      // Set up polling every 5 seconds to fetch the latest list
      const intervalId = setInterval(fetchRecommended, 5000);
  
      // Cleanup on component unmount to stop polling
      return () => clearInterval(intervalId);
    }, []); 

  return (
    <div className="flex flex-col items-center z-50">
      <h1 className="text-3xl outfit-600 mb-4">MOVIES TO WATCH</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {recommendations.map((movie, index) => (
          <div
            key={index}
            className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-[1.15] transition-all"
          >
            <img
              src={
                movie.poster_path
                  ? `${movie.poster_path}`
                  : 'https://via.placeholder.com/100x150?text=No+Image'
              }
              alt={movie.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Border line after the button */}
      <div className="border-b-2 border-gray-600 w-[1600px] mt-20" />
    </div>
  );
};

export default Recommended;
