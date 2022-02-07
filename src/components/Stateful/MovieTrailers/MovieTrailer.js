import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import trailerError from '../../../assets/trailer-error.svg'

const MovieTrailer = ({ id }) => {
    const [trailerKey, setTrailerKey] = useState('')
    const fetchTrailer = () => {
        fetch(`
        https://api.themoviedb.org/3/movie/${id}/videos?api_key=8da43953ed035f8f69ff46e044fbde35&language=en-US`)
            .then(resp => {
                if (!resp.ok) {
                    throw Error('could not fetch the data')
                }
                return resp.json()
            })
            .then(data => setTrailerKey(data.results[0].key)).catch(err => {
                return err;
            })
    }

    useEffect(() => {
        fetchTrailer()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            {!trailerKey && <img className='carousel-img' src={trailerError} alt='trailer-error'/>}
            {trailerKey && <YouTube videoId={trailerKey} className='trailer' />}
        </div>
    )
}

export default MovieTrailer
