import SwiperCore, { Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useEffect } from 'react';
import './HomeCarousel.css';
import "swiper/swiper-bundle.css";
import Navbar from '../Navbar/Navbar';
import { IoIosStar } from 'react-icons/io';
import imdb from '../../../assets/imdb.png'

const img = 'https://image.tmdb.org/t/p/original';
const fetchTrending = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`;

SwiperCore.use([Autoplay, EffectFade]);
const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
}

const HomeCarousel = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = () => {
        fetch(fetchTrending)
            .then(resp => {
                if (!resp.ok) {
                    throw Error('Could not fetch the data for the resource');
                }
                return resp.json()
            })
            .then(data => {
                setMovies(data.results.splice(0, 5));
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [])

    return (
        <div className='home-carousel'>
            <Navbar backgroundColor='transparent' position='fixed' />
            {error && <div>{error}</div>}
            {isLoading && <div className='loading-message'>Loading...</div>}
            {!isLoading && !error && <Swiper
                modules={[EffectFade, Autoplay]}
                effect='fade'
                autoplay
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            >
                {movies.map((movie, i) => {
                    return <SwiperSlide key={i}>
                        {({ isActive }) => (
                            <div className={`${isActive ? 'home-carousel-item active' : 'home-carousel-item'}`} style={{ backgroundImage: `url(${img}${movie.backdrop_path})` }}>
                                <img className='carousel-item-poster' src={`${img}${movie?.poster_path}`} alt={movie.title} />
                                <div className='carousel-item-info'>
                                    <h1 className='carousel-item-title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                                    <h1 className='carousel-item-description'>
                                        {truncate(movie.overview, 150)}
                                    </h1>
                                    <span className='date'>{movie.release_date || movie?.first_air_date}</span>
                                    <div className='carousel-item-span'>
                                        <IoIosStar color='#FFC300' /> {movie?.vote_average}<span className='rating-secondary'>/10</span>
                                        <img className='imdb-logo' src={imdb} alt="imdb" />
                                    </div>
                                    <div className='carousel-item-buttons'>
                                        <button className='carousel-item-button-home'><i className="fas fa-play"></i>Watch Now</button>
                                        <button className='carousel-item-button-secondary'><i className="far fa-heart"></i>Add To Favorites</button>
                                    </div>
                                </div>
                            </div>)}
                    </SwiperSlide>
                })}
            </Swiper>}
        </div >
    )
}

export default HomeCarousel