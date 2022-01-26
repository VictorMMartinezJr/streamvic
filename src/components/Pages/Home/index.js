import React, {Suspense} from 'react';
import HomeCarousel from '../../Stateful/HomeCarousel';
import LoadingDiv from '../../Stateless/Loading';
const AliceCarousel = React.lazy(() => import('../../Stateful/TrendingCarousel'));

const Home = () => {
    return (
        <section className='home'>
            <HomeCarousel />
            <Suspense fallback={<LoadingDiv />}>
                <AliceCarousel />
            </Suspense>
        </section>
    )
}

export default Home