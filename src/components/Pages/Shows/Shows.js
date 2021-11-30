import { useState } from 'react'
import ShowSingleComponent from '../../Stateless/SingleComponent/ShowSingleComponent';
import '../../Pages/Content.css';
import Navbar from '../../Stateful/Navbar/Navbar';
import FilterBtn from '../../Stateless/FilterBtn/FilterBtn';
import Pagination from '../../Stateless/Pagination/Pagination';
import { Helmet } from 'react-helmet-async';
import useFetch from '../../hooks/useFetch';



const Shows = () => {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('popular');
    const { data: shows, error, isLoading } = useFetch(`https://api.themoviedb.org/3/tv/${sort}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)

    // go to next page when next button is clicked on pagination
    const handleNextPage = () => {
        setPage(page + 1);
        window.scroll(0, 0);
    };

    // go to previous page when prev button is clicked on pagination
    const handlePrevPage = () => {
        setPage(page - 1);
        window.scroll(0, 0);
    };

    // the index of the dot you click becomes the current page
    const handleChoosePage = (pageNum) => {
        setPage(pageNum);
        window.scroll(0, 0);
    };


    return (
        <section className='content-container'>
            <Helmet>
                <title>Explore Tv Shows</title>
                <meta name='description' content='Explore all tv shows' />
            </Helmet>
            <Navbar backgroundColor='#000' position='static' />
            <FilterBtn setSort={setSort} setPage={setPage} />
            <div className='content-data'>
                {error && <div>{error}</div>}
                {isLoading && <h1 style={{ color: '#fff' }}>Loading...</h1>}
                {!isLoading && !error && shows && shows.map(shows => {
                    return <div key={shows.id}>
                        <ShowSingleComponent content={shows} title={shows.name} poster={shows.poster_path} rating={shows.vote_average} release={shows.first_air_date} id={shows.id} />
                    </div>
                })}
            </div>
            {!isLoading && !error && shows && <Pagination page={page} handleChoosePage={handleChoosePage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} maxPages={5} />}
        </section>
    )
}

export default Shows;