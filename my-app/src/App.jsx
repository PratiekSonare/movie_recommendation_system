import React, {useRef} from 'react';
import SearchBox from './SearchBox';
import ButtonGreen from './ButtonGreen';
import ButtonBlue from './ButtonBlue';
import ButtonYellow from './ButtonYellow';
import Recommended from './Recommended';
import LikedMovies from './LikedMovies';
import MovieList from './MovieList';
import Rules from './Rules';

function MovieRecommendationApp() {
    const likedMoviesRef = useRef(null);
    const recommendedRef = useRef(null);
    const movieListRef = useRef(null);
  
    // Function to scroll to the respective section
    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='min-h-screen bg-gray-900 text-white'>
            {/* header, searchbox and filter buttons */}
            <div className="flex flex-col items-center justify-center p-6">
                <div className='flex flex-col justify-center items-center z-50 mb-16'>
                    <div className='flex flex-col justify-center items-center bg-gray-900 w-[1000px] rounded-3xl'>
                        <span className='outfit-700 text-[200px] -mb-12 select-none z-50'>boredom.</span>
                    </div>
                    <span className='sanchez-regular text-[20px] select-none'>find new movies, shows, entertainment content and end that <span className='sanchez-regular-italic'>boooooooooredom</span>.</span>            
                </div>

                {/* boredom line */}
                <div className='absolute left-0 top-10 h-auto w-auto'>
                    <img src='./src/assets/large project 5.svg' alt="line" className='z-0' />
                </div>

                {/* buttons for travelling */}
                <div className='flex flex-row justify-center items-center mb-16 z-50 gap-[125px]'>
                    <ButtonGreen onClick={() => scrollToSection(likedMoviesRef)} />
                    <ButtonBlue onClick={() => scrollToSection(recommendedRef)} />
                    <ButtonYellow onClick={() => scrollToSection(movieListRef)} />
                </div>

                {/* searchbox  */}
                <div className='flex flex-col justify-center items-center mb-20 z-30 gap-8'>
                    <SearchBox />
                    <Rules />
                </div>
            </div>      

            {/* Main content section */}
            <div className="flex-grow mx-[120px] z-50 overflow-auto">
                <div className="flex flex-col gap-24">
                    <div ref={movieListRef}>
                        <MovieList recommendedRef={recommendedRef} />
                    </div>
                    <div ref={likedMoviesRef}>
                        <LikedMovies />
                    </div>
                    <div ref={recommendedRef}>
                        <Recommended />
                    </div>
                </div>
            </div>

            {/* Footer or bottom content */}
            <div className='flex items-center justify-center h-16 bg-gray-800'>
                <span className='text-white'>© 2024 - Pratiek Sonare - github.com/PratiekSonare</span>
            </div>
        </div>
    );
}

export default MovieRecommendationApp;