import React, { useEffect, useState } from 'react';

const LikedMovies = () => {
  const [likedMovies, setLikedMovies] = useState([]);

  // Fetch liked movies function
  const fetchLikedMovies = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/favorites", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json();
      setLikedMovies(data);
    } catch (error) {
      console.error('Error fetching liked movies:', error);
    }
  };

  useEffect(() => {
    fetchLikedMovies(); // Fetch the initial list of liked movies

    // Set up polling every 5 seconds to fetch the latest list
    const intervalId = setInterval(fetchLikedMovies, 5000);

    // Cleanup on component unmount to stop polling
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect once

  const removeMovieFromFavorites = async (movieTitle) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/favorites", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: movieTitle }),  // Send the movie title to remove
      });
  
      if (response.ok) {
        // Optionally, refetch the favorites after removal
        fetchLikedMovies();
      } else {
        console.error('Failed to remove movie');
      }
    } catch (error) {
      console.error('Error removing movie from favorites:', error);
    }
  };
  

  return (
    <div className="flex flex-col items-center z-50">
      <h1 className="text-3xl outfit-600">LIKED MOVIES</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {likedMovies.map((movie, index) => (
          <div
            key={index}
            className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-[1.15] transition-all"
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/100x150?text=No+Image'
              }
              alt={movie.title}
              className="w-full h-full object-cover rounded-md"
              onClick={() => removeMovieFromFavorites(movie.title)}
            />
          </div>
        ))}
      </div>

      {/* Border line after the button */}
      <div className="border-b-2 border-gray-600 w-[1600px] mt-20" />

    </div>
  );
};

export default LikedMovies;
