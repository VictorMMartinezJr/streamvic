import SwiperCore, { Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import './HomeCarousel.css';
import "swiper/swiper-bundle.css";
import Navbar from '../Navbar/Navbar';
import { IoIosStar } from 'react-icons/io';
import imdb from '../../../assets/imdb.png';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import FavsBtn from '../../Stateless/FavsBtn/FavsBtn';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


// beginning of url for tmdb images
const img = 'https://image.tmdb.org/t/p/original';

// initialize swiper core
SwiperCore.use([Autoplay, EffectFade]);

// compressing movie description 
const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
}

const HomeCarousel = () => {
    const { data: movies, error, isLoading } = useFetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`)

    return (
        <div className='home-carousel'>
            <Navbar position='fixed' />
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
                                <LazyLoadImage effect='blur' className='carousel-item-poster' src={`${img}${movie?.poster_path}`} alt={movie.title} />
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
                                        <Link to={`/moviedetails/${movie?.id}`} style={{ textDecoration: 'none' }} onClick={() => window.scroll(0, 0)}>
                                            <button className='carousel-item-button-home'><i className="fas fa-arrow-right"></i>Learn More</button>
                                        </Link>
                                        <FavsBtn content={movie} className='carousel' />
                                    </div>
                                </div>
                            </div>)}
                    </SwiperSlide>
                })}
            </Swiper>}
        </div>
    )
}

export default HomeCarousel