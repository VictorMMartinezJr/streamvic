import './SingleComponent.css';
import unavaliable from '../../../assets/photo-unavaliable.png';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import FavsBtn from '../FavsBtn/FavsBtn'


const imgUrl = 'https://image.tmdb.org/t/p/original';

const ShowSingleComponent = ({ title, poster, rating, release, id, content }) => {
    return (
        <div className='component'>
            <div className='component-data'>
                <div className='component-img-container'>
                    <Link to={`/showsdetails/${id}`} style={{ textDecoration: 'none' }} onClick={() => window.scroll(0, 0)}>
                        <img src={poster === undefined || poster === null ? unavaliable : `${imgUrl}${poster}`} alt={`${title}`} className='component-img' />
                    </Link>
                    <p className='trending-movie-rating' style={{ color: rating >= 8 ? 'green' : 'orange' }}>{rating > 0 ? rating : 'n/a'}</p>
                </div>
                <FavsBtn content={content} className='content' />
                <h3 className='component-title'>{title}</h3>
                <span className='component-release'>{release}</span>
            </div>
        </div>
    )
}

export default ShowSingleComponent