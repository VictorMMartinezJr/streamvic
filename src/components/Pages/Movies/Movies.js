import { useState } from 'react'
import MovieSingleComponent from '../../Stateless/SingleComponent/MovieSingleComponent';
import '../../Pages/Content.css';
import Navbar from '../../Stateful/Navbar/Navbar';
import FilterBtn from '../../Stateless/FilterBtn/FilterBtn';
import Pagination from '../../Stateless/Pagination/Pagination';
import { Helmet } from 'react-helmet-async';
import useFetch from '../../../hooks/UseFetch';

const Movies = () => {
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('popular');
    const { data: movies, error, isLoading, } = useFetch(`https://api.themoviedb.org/3/movie/${sort}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)

    // go to next page when next button is clicked on pagination
    const handleNextPage = () => {
        setPage(page + 1);
        window.scroll(0, 0);
    };

    // go to previous page when prev button is clicked on pagination
    const handlePrevPage = () => {
        setPage(page - 1);
        window.scroll(0, 0)
    };

    // the index of the dot you click becomes the current page
    const handleChoosePage = (pageNum) => {
        setPage(pageNum);
        window.scroll(0, 0)
    };


    return (
        <section className='content-container'>
            <Helmet>
                <title>Explore Movies</title>
                <meta name='description' content='Explore all movies' />
            </Helmet>
            <Navbar backgroundColor='#000' position='static' />
            <FilterBtn setSort={setSort} setPage={setPage} />
            <div className='content-data'>
                {error && <div>{error}</div>}
                {isLoading && <h1 style={{ color: '#fff' }}>Loading...</h1>}
                {!isLoading && !error && movies && movies.map(movie => {
                    return <div key={movie.id} className='movie-component'>
                        <MovieSingleComponent content={movie} title={movie.title} poster={movie.poster_path} rating={movie.vote_average} release={movie.release_date} id={movie.id} />
                    </div>
                })}
            </div>
            {!isLoading && !error && movies && <Pagination page={page} handleChoosePage={handleChoosePage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} maxPages={5} />}
        </section>
    )
}

export default Movies;