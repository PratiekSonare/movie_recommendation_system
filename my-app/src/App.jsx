import React, { useState, useEffect } from 'react';
import SearchBox from './SearchBox';

function MovieRecommendationApp() {
    const [movie, setMovie] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [selectedFavorites, setSelectedFavorites] = useState([]);
    const [isRecommendationsVisible, setIsRecommendationsVisible] = useState(false); // Flag to toggle recommended movies visibility

    // Fetch the movie list on component mount
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/movies');
                const data = await response.json();
                setMovieList(data);
            } catch (err) {
                console.error('Error fetching movie list:', err);
            }
        };

        fetchMovies();
    }, []);

    // Handle the form submission to fetch recommendations
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedFavorites.length === 0) {
            setError('Please select some favorite movies first!');
            return;
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

    // Handle movie selection (checkbox toggle for favorite movies)
    const handleFavoriteChange = (movieTitle) => {
        setSelectedFavorites((prevFavorites) =>
            prevFavorites.includes(movieTitle)
                ? prevFavorites.filter((title) => title !== movieTitle)
                : [...prevFavorites, movieTitle]
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">

            <div className='flex flex-col justify-center items-center z-50'>
                <span className='outfit-700 text-[200px] -mb-12 select-none z-50'>boredom.</span>
                <span className='outfit-700 text-[200px] -mb-12 select-none absolute top-10 text-gray-800 z-0'>boredom.</span>
                <span className='sanchez-regular text-[20px] select-none'>find new movies, shows, entertainment content and end that <span className='sanchez-regular-italic'>boooooooooredom</span>.</span>            
                <SearchBox />
            </div>



            <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Movie Recommendation System</h1>
                
                {/* Movie List for selecting favorites */}
                {!isRecommendationsVisible && (
                    <>
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold mb-4">Select Your Favorite Movies</h2>
                            <ul className="max-h-64 overflow-y-auto space-y-2">
                                {movieList.map((title, index) => (
                                    <li
                                        key={index}
                                        className="bg-gray-700 p-2 rounded-md text-sm cursor-pointer hover:bg-gray-600 transition"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedFavorites.includes(title)}
                                            onChange={() => handleFavoriteChange(title)} // Toggle favorite movie selection
                                            className="mr-2"
                                        />
                                        {title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        {/* Display the selected favorite movies */}
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-4">Your Favorite Movies</h2>
                            <ul className="space-y-2">
                                {selectedFavorites.map((favorite, index) => (
                                    <li key={index} className="bg-gray-700 p-2 rounded-md">{favorite}</li>
                                ))}
                            </ul>
                        </div>

                        {/* Button to get recommendations */}
                        <div className="mt-8 text-center">
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                            >
                                Get Recommendations
                            </button>
                        </div>
                    </>
                )}

                {/* Display Error */}
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                {/* Display recommended movies */}
                {isRecommendationsVisible && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold mb-4">Recommended Movies</h2>
                        <ul className="space-y-4">
                            {recommendations.map((movie, index) => (
                                <li
                                    key={index}
                                    className="bg-gray-700 p-4 rounded-md flex items-center gap-4"
                                >
                                    <img
                                        src={
                                            movie.poster_path
                                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                                : 'https://via.placeholder.com/100x150?text=No+Image'
                                        }
                                        alt={movie.title}
                                        className="w-16 h-24 rounded-md object-cover"
                                    />
                                    <span>{movie.title}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className='absolute left-10 top-32 h-auto w-auto'>
                <img src='./src/assets/test3.svg' alt="line" className='z-0' />
            </div>

        </div>
    );
}

export default MovieRecommendationApp;
