import AliceCarousel from '../../Stateful/TrendingCarousel/TrendingCarousel';
import HomeCarousel from '../../Stateful/HomeCarousel/HomeCarousel';

const Home = () => {
    return (
        <section className='home'>
            <HomeCarousel />
            <AliceCarousel />
        </section>
    )
}

export default Home