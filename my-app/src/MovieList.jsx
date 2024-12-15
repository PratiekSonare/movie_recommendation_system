import React, { useEffect, useState } from 'react';

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchMovieList = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/movies');
        const data = await response.json();
        setMovieList(data); // Includes title and poster_path
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovieList();
  }, []);

  const handleAddToFavorites = async (movie) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });

      if (response.ok) {
        setNotification(`${movie.title} added to favorites!`);
        setTimeout(() => setNotification(''), 2000); // Clear the notification after 2 seconds
      } else {
        console.error('Error adding movie to favorites:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
    }
  };

  // Handle the form submission to fetch recommendations
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFavorites.length === 0) {
        setError('Please select some favorite movies first!');
        return error;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movies: selectedFavorites }), // Send selected favorite movies for recommendations
        });

        const data = await response.json();
        if (data.error) {
            setError(data.error);
            setRecommendations([]);
        } else {
            setError('');
            setRecommendations(data);
        }
        setIsRecommendationsVisible(true); // Show recommendations after fetching
    } catch (err) {
        setError('An error occurred while fetching recommendations.');
        setRecommendations([]);
        setIsRecommendationsVisible(false); // Hide recommendations if error occurs
    }
  };

  /////////////////////////
  // displaying more movies
  
  const [visibleMovies, setVisibleMovies] = useState(30); // Initially display 30 movies

  const moreMovies = () => {
    setVisibleMovies(prev => prev + 30);
  }

  return (
    <div className="flex flex-col items-center z-50">
      <h1 className="text-3xl outfit-600 mb-4">LIST OF ALL MOVIES</h1>
            {/* Notification */}
      {notification && (
        <div className="fixed top-5 right-[10px] transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg animate-bounce duration-1000 z-50">
          {notification}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
        {movieList.slice(0, visibleMovies).map((movie, index) => (
          <div
            key={index}
            className="relative bg-gray-800 rounded-lg shadow-lg  cursor-pointer hover:scale-[1.15] transition-all"
            // style={{ height: '300px', width: '200px' }} // Adjust dimensions as needed
            onClick={() => handleAddToFavorites(movie)} // Trigger the action when the card is clicked
          >
            {/* Movie Image */}
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/100x150?text=No+Image'
              }
              alt={movie.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>

        {/* Button to get recommendations */}
        <div className="mt-8 text-center flex flex-col items-center justify-center gap-10">
          <button
              onClick={() => moreMovies()}
              className="px-4 py-2 text-sm bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 sdw-green-alt"
          >
              ▼
          </button>

          <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md text-xl hover:bg-blue-700 sdw-blue"
          >
              Get Recommendations
          </button>
      </div>

      {/* Border line after the button */}
      <div className="border-b-2 border-gray-600 w-[1600px] mt-20" />
    </div>
  );
};

export default MovieList;
