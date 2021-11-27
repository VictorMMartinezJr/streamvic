import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DetailsCarousel from './DetailsCarousel';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import './Details.css';
import Navbar from '../../Stateful/Navbar/Navbar';


const imgUrl = 'https://image.tmdb.org/t/p/original';

const Details = () => {
    const [movieDetails, setMovieDetails] = useState({});
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    const fetchContent = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            .then(resp => {
                if (!resp.ok) {
                    throw Error('could not fetch the data')
                }
                return resp.json()
            })
            .then(data => {
                setMovieDetails(data);
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

    const value = movieDetails.vote_average;

    const truncate = (str, n) => str?.length > n ? str.substring(0, n - 1) + '...' : str;

    console.log(movieDetails)


    return (
        <div
            className='details-container'
            style={{
                backgroundImage: `url(${imgUrl}${movieDetails.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',

            }}>
            <Navbar />
            {error && <div>{error}</div>}
            {isLoading && <h1 style={{ color: '#fff' }}>Loading...</h1>}
            {!isLoading && !error && <div className='details-main'>
                <img className='details-poster' src={`${imgUrl}${movieDetails.poster_path}`} alt={movieDetails.name} />
                <div className='details-main-info'>
                    <h1 className='details-title'>{movieDetails.title}</h1>
                    <p className='details-overview'>{truncate(movieDetails.overview, 300)}</p>
                    <span className='details-span'>
                        <div className='gauge'>
                            <CircularProgressbar value={value} maxValue={10} text={value ? `${value}` : ''} styles={buildStyles({
                                trailColor: "transparent",
                                textColor: '#fff',
                                pathColor: '#fff'
                            })} />
                            <h3 className='gauge-rating'>Rating</h3>
                        </div>
                        <button className='details-btn'><a href={movieDetails.homepage} style={{ textDecoration: 'none', color: '#fff' }}>Watch Now</a></button>
                    </span>
                </div>
            </div>}

            <div className='details-cast'>
                <DetailsCarousel url={`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`} title={'Cast'} />
            </div>
        </div>
    )
}

export default Details;