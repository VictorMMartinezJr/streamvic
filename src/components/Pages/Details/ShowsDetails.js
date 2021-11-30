import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DetailsCarousel from './DetailsCarousel';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import './Details.css';
import Navbar from '../../Stateful/Navbar/Navbar';
import TvTrailer from '../../Stateful/TvTrailer/TvTrailer';
import FavsBtn from '../../Stateless/FavsBtn/FavsBtn';
import { Helmet } from 'react-helmet-async';



const imgUrl = 'https://image.tmdb.org/t/p/original';

const ShowDetails = () => {
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
    }, [id])

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
            <Helmet>
                <title>{showDetails.name}</title>
                <meta name='description' content={showDetails.overview} />
            </Helmet>
            <Navbar position='static' />
            {error && <div>{error}</div>}
            {isLoading && <h1 style={{ color: '#fff' }}>Loading...</h1>}
            {!isLoading && !error && <div className='details-main'>
                <div className='details-main-info'>
                    <img className='details-poster' src={`${imgUrl}${showDetails.poster_path}`} alt={showDetails.name} />
                    <div className='details-main-info-text'>
                        <h1 className='details-title'>{showDetails.name}</h1>
                        <p className='details-overview'>{truncate(showDetails.overview, 300)}</p>
                        <div className='details-genres'>
                            <h1>Genres</h1>
                            <span>
                                {showDetails.genres.map((genre, i) => <h3 key={i}>{genre.name}</h3>)}
                            </span>

                        </div>
                        <div className='gauge-container'>
                            <div className='gauge'>
                                <CircularProgressbar value={value} maxValue={10} text={value ? `${value}` : ''} styles={buildStyles({
                                    trailColor: "transparent",
                                    textColor: '#fff',
                                    pathColor: '#fff'
                                })} />
                                <h3 className='gauge-rating'>Rating</h3>
                            </div>
                            <FavsBtn content={showDetails} className='details' />
                        </div>
                    </div>
                </div>
            </div>}
            <span className='details-trailer'>
                <h1 className='trailer-h1'>Watch Trailer</h1>
                <TvTrailer id={id} />
            </span>

            <div className='details-cast'>
                <DetailsCarousel url={`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`} title={'Cast'} />
            </div>
        </div>
    )
}

export default ShowDetails;