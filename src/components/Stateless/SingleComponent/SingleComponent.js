import './SingleComponent.css';
import unavaliable from '../../../assets/photo-unavaliable.png';
import { useContext } from 'react';
import { Favs } from '../../../context/GlobalContext';
import { Link } from 'react-router-dom';

const imgUrl = 'https://image.tmdb.org/t/p/original';

const SingleComponent = ({ title, poster, rating, release, id, content }) => {
    const { state: { favorites }, dispatch } = useContext(Favs);

    // add movie/show to favorites
    const addToFav = () => {
        dispatch({ type: 'ADD-TO-FAV', payload: content });
    }

    // remove movie/show from favorites
    const RemoveFromFav = () => {
        dispatch({ type: 'REMOVE-FROM-FAV', payload: content });
        console.log('removed')
    }

    return (
        <div className='component'>
            <div className='trending-img-container'>
                <Link to={`/moviedetails/${id}`} style={{ textDecoration: 'none' }} onClick={() => window.scroll(0, 0)}>
                    <img src={poster === undefined || poster === null ? unavaliable : `${imgUrl}${poster}`} alt={`${title}`} className='component-img' />
                </Link>
                <p className='trending-movie-rating' style={{ color: rating >= 8 ? 'green' : 'orange' }}>{rating > 0 ? rating : 'n/a'}</p>
            </div>
            {favorites.some(content => content.id === id) ? <i className="far fa-heart content-favorite-icon active" onClick={RemoveFromFav}></i> : <i className="far fa-heart content-favorite-icon" onClick={addToFav}></i>}
            <h3 className='component-title'>{title}</h3>
            <span className='component-release'>{release}</span>
        </div>
    )
}

export default SingleComponent