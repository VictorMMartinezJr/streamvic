import './SingleComponent.css';
import unavaliable from '../../../assets/photo-unavaliable.png';
import { useContext } from 'react';
import { Favs } from '../../../context/GlobalContext';
import { Link } from 'react-router-dom';

const imgUrl = 'https://image.tmdb.org/t/p/original';

const SingleComponent = ({ title, poster, rating, release, id, content }) => {
    const { favorites, setFavorites } = useContext(Favs);

    const addToLocalStorage = (item) => {
        localStorage.setItem('favs', JSON.stringify(item));
    }

    // add movie/show to favorites
    const addToFav = (content) => {
        const newFavsList = [...favorites, content];
        addToLocalStorage(newFavsList)
        setFavorites(newFavsList)
    }

    // remove movie/show from favorites
    const removeFromFav = () => {
        const newFavsList = favorites.filter(fav => fav.id !== content.id)
        addToLocalStorage(newFavsList)
        setFavorites(newFavsList);
    }

    return (
        <div className='component'>
            <div className='component-data'>
                <div className='component-img-container'>
                    <Link to={`/showsdetails/${id}`} style={{ textDecoration: 'none' }} onClick={() => window.scroll(0, 0)}>
                        <img src={poster === undefined || poster === null ? unavaliable : `${imgUrl}${poster}`} alt={`${title}`} className='component-img' />
                    </Link>
                    <p className='trending-movie-rating' style={{ color: rating >= 8 ? 'green' : 'orange' }}>{rating > 0 ? rating : 'n/a'}</p>
                </div>
                {favorites && favorites.some(content => content.id === id) ? <i className="far fa-heart content-favorite-icon active" onClick={() => removeFromFav(content)}></i> : <i className="far fa-heart content-favorite-icon" onClick={() => addToFav(content)}></i>}
                <h3 className='component-title'>{title}</h3>
                <span className='component-release'>{release}</span>
            </div>
        </div>
    )
}

export default SingleComponent