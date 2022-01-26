import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './TrendingCarousel.css';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ErrorDiv from '../../Stateless/Error';
import {BsArrowRightCircle, BsArrowLeftCircle} from 'react-icons/bs'

// BaseURL for images
const imgUrl = 'https://image.tmdb.org/t/p/original';
const unavaliable = 'https://mychildsafetyinstitute.org/wp-content/uploads/2014/07/Profile-Photo-Unavailable.png';

const Carousel = () => {
    const { data, error, isLoading } = useFetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`)

    // Items in carousel
    const items = data.map(data => {
        return <div className='img-container'>
            <Link to={`/moviedetails/${data.id}`} style={{ textDecoration: 'none' }} onClick={() => window.scroll(0, 0)}>
                <LazyLoadImage effect='blur' className='carousel-img' src={data.profile_path === null || data.poster_path === null ? unavaliable : `${imgUrl}${data?.poster_path || data?.profile_path}`} alt={data?.title} />
            </Link>
            <h1>{data?.name || data?.title}</h1>
        </div>
    })

    // Carousel Responsiveness
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

    // Next/Previous Buttons
    const renderNextButton = () => {
        return <BsArrowRightCircle className="fas fa-arrow-right" />
    }

    const renderPrevButton = () => {
        return <BsArrowLeftCircle className="fas fa-arrow-left" />
    }

    return (
        <div className='slider-section'>
            {error && <ErrorDiv message={error} />}
            {!isLoading && !error && <div className='slider-container'>
                <h1 className='slider-title'>Trending Movies</h1>
                <AliceCarousel mouseTracking items={items} responsive={responsive} animationDuration={600} infinite animationType='fadeout' autoHeight disableDotsControls renderNextButton={renderNextButton} renderPrevButton={renderPrevButton} />
            </div>}
        </div>
    );
}

export default Carousel;