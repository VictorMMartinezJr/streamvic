import { useState, useEffect } from 'react'
import SingleComponent from '../../Stateless/SingleComponent/SingleComponent';
import '../../Pages/Content.css';
import { Link } from 'react-router-dom';
import Navbar from '../../Stateful/Navbar/Navbar';
import FilterBtn from '../../Stateless/FilterBtn/FilterBtn';
import Pagination from '../../Stateless/Pagination/Pagination';



const Shows = () => {
    const [page, setPage] = useState(1);
    const [shows, setShows] = useState([]);
    const [sort, setSort] = useState('popular');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const fetchMovies = () => {
        fetch(`https://api.themoviedb.org/3/tv/${sort}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
            .then(resp => {
                if (!resp.ok) {
                    throw Error('could not fetch the data')
                }
                return resp.json()
            })
            .then(data => {
                setShows(data.results);
                console.log(data.results)
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
            setShows('')
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
                {!isLoading && !error && shows && shows.map(shows => {
                    return <div key={shows.id}>
                        <Link to={`/moviedetails/${shows.id}`} style={{ textDecoration: 'none' }} onClick={() => window.scroll(0, 0)}>
                            <SingleComponent title={shows.name} poster={shows.poster_path} rating={shows.vote_average} release={shows.first_air_date} id={shows.id} />
                        </Link>
                    </div>
                })}
            </div>
            {!isLoading && !error && shows && <Pagination page={page} handleChoosePage={handleChoosePage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} maxPages={5} />}
        </section>
    )
}

export default Shows;