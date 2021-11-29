import { useContext } from 'react';
import { Favs } from '../../context/GlobalContext'

const FavsBtn = ({ content, className, checkFav }) => {
    const { favorites, setFavorites } = useContext(Favs);

    //function to check if the movie is faved or not; if there is no existing favs movies, return false;
    //else, return true if the current movie belongs to the favs movies that are already stored in local storage
    const isFav = (id) => {
        if (favorites.length === 0) {
            return false;
        }

        return favorites.some((movie) => movie.id === id);
    };

    const addToLocalStorage = (item) => {
        localStorage.setItem('favs', JSON.stringify(item));
    }
    // add movie/show to favorites
    const addToFav = () => {
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
        <div className={`favs-btn ${className}`}>
            {!checkFav || isFav(content.id) ? (
                <i className="far fa-heart content-favorite-icon active" onClick={() => removeFromFav(content)}></i>
            ) : (
                <i className="far fa-heart content-favorite-icon" onClick={() => addToFav(content)}></i>
            )}
        </div>
    );
};

FavsBtn.defaultProps = {
    checkFav: true,
};

export default FavsBtn;