import AliceCarousel from '../../Stateful/TrendingCarousel/TrendingCarousel';
import HomeCarousel from '../../Stateful/HomeCarousel/HomeCarousel';

const Home = () => {
    return (
        <section className='home'>
            <HomeCarousel />
            <AliceCarousel url={`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`} title={'Trending Movies'} />
        </section>
    )
}

export default Home