import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './TrendingCarousel.css';
import unavaliable from '../../../assets/photo-unavaliable.png';
import useFetch from '../../../hooks/UseFetch';
import SingleComponent from '../../Stateless/SingleComponent/SingleComponent';

// fetch trending movies url
const fetchTrending = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`;

const TrendingCarousel = ({ title }) => {
    const { data, isLoading, error } = useFetch(fetchTrending);

    // items in carousel
    const items = data.map(data => {
        return <div className='content-data'>
            <div key={data.id}>
                <SingleComponent content={data} title={data.title || data.name} poster={data.poster_path || unavaliable} rating={data.vote_average} release={data.release_date || data.first_air_date} id={data.id} />
            </div>
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