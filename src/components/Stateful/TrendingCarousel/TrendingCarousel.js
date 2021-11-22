import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './TrendingCarousel.css';
import { Link } from 'react-router-dom';
import unavaliable from '../../../assets/photo-unavaliable.png';
import useFetch from '../../../hooks/UseFetch';

// baseURL for images
const imgUrl = 'https://image.tmdb.org/t/p/original';

// fetch trending movies url
const fetchTrending = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`;

const TrendingCarousel = ({ url, title }) => {
    const { data, isLoading, error } = useFetch(fetchTrending);
    console.log(data)

    // items in carousel
    const items = data.map(data => {
        return <div className='img-container'>
            <Link to={`/moviedetails/${data.id}`} style={{ textDecoration: 'none' }} onClick={() => window.scroll(0, 0)}>
                <div className='trending-img-container'>
                    <img className='trending-carousel-img' src={data.profile_path === null || data.poster_path === null ? unavaliable : `${imgUrl}${data?.poster_path || data?.profile_path}`} alt={data?.title} />
                    <p className='trending-movie-rating' style={{ color: data.vote_average >= 8 ? 'green' : 'orange' }}>{data?.vote_average > 0 ? data?.vote_average : 'n/a'}</p>
                </div>
            </Link>
            <h4>{data?.name || data?.title}</h4>
        </div>
    })

    // carousel responsiveness
    const responsive = {
        0: {
            items: 1,
        },
        400: {
            items: 2
        },
        700: {
            items: 3
        },
        1024: {
            items: 5
        }
    }

    // carousel next button
    const renderNextButton = () => {
        return <i className="fas fa-arrow-right"></i>
    }
    // carousel previous button
    const renderPrevButton = () => {
        return <i className="fas fa-arrow-left"></i>
    }

    return (
        <div className='slider-section'>
            {error && <div>{error}</div>}
            {!isLoading && !error && <div className='slider-container'>
                <h1 className='slider-title'>{title}</h1>
                <AliceCarousel mouseTracking items={items} responsive={responsive} animationDuration={600} infinite animationType='fadeout' autoHeight disableDotsControls renderNextButton={renderNextButton} renderPrevButton={renderPrevButton} />
            </div>}
        </div>
    );
}

export default TrendingCarousel;