import { useState, useEffect } from 'react'
import SingleComponent from '../../Stateless/SingleComponent/MovieSingleComponent';
import '../../Pages/Content.css';
import './Favorites.css'
import Navbar from '../../Stateful/Navbar/Navbar';
import { useContext } from 'react';
import { Favs } from '../../../context/GlobalContext'
import heart from '../../../assets/heart.png';
import { Helmet } from 'react-helmet-async';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Favorites = () => {
    const [data, setData] = useState([]);
    const { favorites } = useContext(Favs);

    useEffect(() => {
        setData(favorites);
        return () => {
            setData('')
        }
        // eslint-disable-next-line
    }, [favorites])

    return (
        <section className='content-container'>
            <Helmet>
                <title>Favorites</title>
                <meta name='description' content='Explore your favorite movies and tv shows' />
            </Helmet>
            <Navbar backgroundColor='#000' position='static' />
            <div className='content-data'>
                {favorites.length < 1 && <div className='empty-favorites'>
                    <LazyLoadImage effect='blur' src={heart} alt="heart" />
                    <h1>Favorites Empty Click the <i style={{ color: 'red' }} className="far fa-heart"></i> Icon To Add Here!</h1>
                </div>}
                {data && data.map(data => {
                    return <div key={data.id}>
                        <SingleComponent content={data} title={data.title || data.name} poster={data.poster_path} rating={data.vote_average} release={data.release_date || data.first_air_date} id={data.id} />
                    </div>
                })}
            </div>
        </section>
    )
}

export default Favorites;