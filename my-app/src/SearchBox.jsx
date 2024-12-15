import React, { useState, useEffect } from "react";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [movieList, setMovieList] = useState([]); 
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/movies'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Inspect movieList structure
        setMovieList(data); 
      } catch (err) {
        console.error('Error fetching movie list:', err);
      }
    };

    fetchMovies();
  }, []); 

  const handleAddToFavorites = async (movie) => {
    const movieData = typeof movie === "string" ? { title: movie } : movie;
  
    try {
      const response = await fetch('http://127.0.0.1:5000/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData), // Send in the correct format
      });
  
      if (response.ok) {
        setNotification(`${movieData.title} added to favorites!`);
        setTimeout(() => setNotification(''), 2000); // Clear the notification after 2 seconds
      } else {
        console.error('Error adding movie to favorites:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
    }
  };

  useEffect(() => {
    setIsVisible(searchTerm.trim().length > 0);
  }, [searchTerm]);

  // Update filtering logic based on data structure
  const filteredItems = movieList.filter((movie) =>
    typeof movie === "string"
      ? movie.toLowerCase().includes(searchTerm.toLowerCase()) // If movieList is an array of strings
      : movie.title.toLowerCase().includes(searchTerm.toLowerCase()) // If movieList contains objects with a "title" property
  );

  return (
    <div className="relative w-[1000px] mx-auto">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 rounded text-black"
      />
      
      {isVisible && (
        <ul
          className={`absolute top-full left-0 w-full bg-gray-900 rounded-md text-gray-500 transition-all duration-300 ease-in-out transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
          } z-50`}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li
                key={index}
                className="py-2 border-b-2 border-r-1 bg-gray-800 border-r-blue-600 border-b-blue-400 border-l-[3px] border-l-blue-600 rounded-md hover:translate-x-5 transition ease-in-out"
                onClick={() => handleAddToFavorites(item)} // Handle both strings and objects
              >
                <span className="mx-5 select-none">{typeof item === "string" ? item : item.title}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No items found</li>
          )}
        </ul>
      )}

      {/* Notification */}
      {notification && (
        <div className="fixed top-5 right-[10px] transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg animate-bounce duration-1000 z-50">
          {notification}
        </div>
      )}
    </div>
  );
}

export default SearchBox;
