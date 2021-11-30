import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DetailsCarousel from './DetailsCarousel';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import './Details.css';
import Navbar from '../../Stateful/Navbar/Navbar';
import MovieTrailer from '../../Stateful/MovieTrailers/MovieTrailer';
import FavsBtn from '../../Stateless/FavsBtn/FavsBtn';
import { Helmet } from 'react-helmet-async';



const imgUrl = 'https://image.tmdb.org/t/p/original';

const MoviesDetails = () => {
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



    return (
        <div
            className='details-container'
            style={{
                backgroundImage: `url(${imgUrl}${movieDetails.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',

            }}>
            <Helmet>
                <title>{movieDetails.title}</title>
                <meta name='description' content={movieDetails.overview} />
            </Helmet>
            <Navbar position='static' />
            {error && <div>{error}</div>}
            {isLoading && <h1 style={{ color: '#fff' }}>Loading...</h1>}
            {!isLoading && !error && <div className='details-main'>
                <div className='details-main-info'>
                    <img className='details-poster' src={`${imgUrl}${movieDetails.poster_path}`} alt={movieDetails.name} />
                    <div className='details-main-info-text'>
                        <h1 className='details-title'>{movieDetails.title}</h1>
                        <p className='details-overview'>{truncate(movieDetails.overview, 300)}</p>
                        <div className='details-genres'>
                            <h1>Genres</h1>
                            <span>
                                {movieDetails.genres.map((genre, i) => <h3 key={i}>{genre.name}</h3>)}
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
                            <FavsBtn content={movieDetails} className='details' />
                        </div>
                    </div>
                </div>
            </div>}
            <span className='details-trailer'>
                <h1 className='trailer-h1'>Watch Trailer</h1>
                <MovieTrailer id={id} />
            </span>

            <div className='details-cast'>
                <DetailsCarousel url={`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`} title={'Cast'} />
            </div>
        </div>
    )
}

export default MoviesDetails;