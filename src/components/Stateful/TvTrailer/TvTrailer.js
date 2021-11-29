import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const TvTrailer = ({ id }) => {
    const [trailerKey, setTrailerKey] = useState('')
    const fetchTrailer = () => {
        fetch(`
        https://api.themoviedb.org/3/tv/${id}/videos?api_key=8da43953ed035f8f69ff46e044fbde35&language=en-US`)
            .then(resp => {
                if (!resp.ok) {
                    throw Error('could not fetch the data')
                }
                return resp.json()
            })
            .then(data => setTrailerKey(data.results[0].key))
    }

    useEffect(() => {
        fetchTrailer()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            {trailerKey && <YouTube videoId={trailerKey} className='trailer' />}
        </div>
    )
}

export default TvTrailer
