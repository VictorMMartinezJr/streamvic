import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DetailsCarousel from './DetailsCarousel';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import './Details.css';
import Navbar from '../../Stateful/Navbar/Navbar';


const imgUrl = 'https://image.tmdb.org/t/p/original';

const ShowsDetails = () => {
    const [showDetails, setShowDetails] = useState({});
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    const fetchContent = () => {
        fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)

            .then(resp => {
                if (!resp.ok) {
                    throw Error('could not fetch the data')
                }
                return resp.json()
            })
            .then(data => {
                setShowDetails(data);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetchContent();
        // eslint-disable-next-line
    }, [])

    const value = showDetails.vote_average;

    const truncate = (str, n) => str?.length > n ? str.substring(0, n - 1) + '...' : str;

    return (
        <div
            className='details-container'
            style={{
                backgroundImage: `url(${imgUrl}${showDetails.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',

            }}>
            <Navbar />
            {error && <div>{error}</div>}
            {isLoading && <h1 style={{ color: '#fff' }}>Loading...</h1>}
            {!isLoading && !error && <div className='details-main'>
                <img className='details-poster' src={`${imgUrl}${showDetails.poster_path}`} alt="" />
                <div className='details-main-info'>
                    <h1 className='details-title'>{showDetails.name}</h1>
                    <p className='details-overview'>{truncate(showDetails.overview, 300)}</p>
                    <span className='details-span'>
                        <div className='gauge'>
                            <CircularProgressbar value={value} maxValue={10} text={value ? `${value}` : ''} styles={buildStyles({
                                trailColor: 'transparent',
                                textColor: '#fff',
                                pathColor: '#fff'
                            })} />
                            <h3 className='gauge-rating'>Rating</h3>
                        </div>
                        <button className='details-btn'><a href={showDetails.homepage} style={{ textDecoration: 'none', color: '#fff' }}>Watch Now</a></button>
                    </span>
                </div>
            </div>}

            <div className='details-cast'>
                <DetailsCarousel url={`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`} title={'Cast'} />
            </div>
        </div>
    )
}

export default ShowsDetails;