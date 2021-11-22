import AliceCarousel from '../../Stateful/AliceCarousel/TrendingCarousel';
import HomeCarousel from '../../Stateful/HomeCarousel/HomeCarousel';

const Home = (url) => {
    return (
        <section className='home'>
            <HomeCarousel />
            <AliceCarousel url={`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`} title={'Trending Movies'} />
        </section>
    )
}

export default Home