import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { useState, useEffect } from 'react';
import './TrendingCarousel.css';
import { Link } from 'react-router-dom';
import unavaliable from '../../../assets/photo-unavaliable.png';

// BaseURL for images
const imgUrl = 'https://image.tmdb.org/t/p/original';

const TrendingCarousel = ({ url, title }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Trending Movies & setMovies
    const fetchData = () => {
        fetch(url)
            .then(resp => {
                if (!resp.ok) {
                    throw Error('Could not fetch the data for the resource');
                }
                return resp.json()
            })
            .then(data => {
                setData(data.results || data.cast);
                setIsLoading(false)
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            })
    }

    // Call FetchTrending
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [])

    // Items in carousel
    const items = data.map(data => {
        return <div className='img-container'>
            <Link to={`/moviedetails/${data.id}`} style={{ textDecoration: 'none' }} onClick={() => window.scroll(0, 0)}>
                <img className='trending-carousel-img' src={data.profile_path === null || data.poster_path === null ? unavaliable : `${imgUrl}${data?.poster_path || data?.profile_path}`} alt={data?.title} />
            </Link>
            <h4>{data?.name || data?.title}</h4>
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
        return <i className="fas fa-arrow-right"></i>
    }

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