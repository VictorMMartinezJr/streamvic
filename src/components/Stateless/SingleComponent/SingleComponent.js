import './SingleComponent.css';
import unavaliable from '../../../assets/photo-unavaliable.png'

const imgUrl = 'https://image.tmdb.org/t/p/original';

const SingleComponent = ({
    title,
    poster,
    rating,
    release,
    id
}) => {
    return (

        <div className='component'>
            <div className='component-data'>
                <img src={poster === undefined || poster === null ? unavaliable : `${imgUrl}${poster}`} alt={`${title}`} className='component-img' />
                <h3 className='component-title'>{title}</h3>
                <span className='component-release'>{release}</span>
            </div>
        </div>

    )
}

export default SingleComponent