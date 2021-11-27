import { useState, useEffect } from 'react'
import SingleComponent from '../../Stateless/SingleComponent/SingleComponent';
import '../../Pages/Content.css';
import Navbar from '../../Stateful/Navbar/Navbar';
import FilterBtn from '../../Stateless/FilterBtn/FilterBtn';
import Pagination from '../../Stateless/Pagination/Pagination';



const Movies = () => {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [sort, setSort] = useState('popular');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const fetchMovies = () => {
        fetch(`https://api.themoviedb.org/3/movie/${sort}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
            .then(resp => {
                if (!resp.ok) {
                    throw Error('could not fetch the data')
                }
                return resp.json()
            })
            .then(data => {
                setMovies(data.results);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetchMovies();
        return () => {
            setMovies('')
        }
        // eslint-disable-next-line
    }, [page, sort])

    // go to next page when next button is clicked on pagination
    const handleNextPage = () => {
        setPage(page + 1);
    };

    // go to previous page when prev button is clicked on pagination
    const handlePrevPage = () => {
        setPage(page - 1);
    };

    // the index of the dot you click becomes the current page
    const handleChoosePage = (pageNum) => {
        setPage(pageNum);
    };


    return (
        <section className='content-container'>
            <Navbar backgroundColor='#000' position='static' />
            <FilterBtn setSort={setSort} setPage={setPage} />
            <div className='content-data'>
                {error && <div>{error}</div>}
                {isLoading && <h1 style={{ color: '#fff' }}>Loading...</h1>}
                {!isLoading && !error && movies && movies.map(movie => {
                    return <div key={movie.id}>
                        <SingleComponent content={movie} title={movie.title} poster={movie.poster_path} rating={movie.vote_average} release={movie.release_date} id={movie.id} />
                    </div>
                })}
            </div>
            {!isLoading && !error && movies && <Pagination page={page} handleChoosePage={handleChoosePage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} maxPages={5} />}
        </section>
    )
}

export default Movies;