import { useState } from 'react'
import SingleComponent from '../../Stateless/SingleComponent/SingleComponent';
import useFetch from '../../../hooks/UseFetch';
import './Content.css';
// import '../../components/Search.css'
// import { Pagination } from '@material-ui/lab';
// import { createTheme } from '@material-ui/core';
// import { ThemeProvider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Navbar from '../../Stateful/Navbar/Navbar';
// import SecondaryNavbar from '../SecondaryNavbar';


const Movies = () => {
    const [page, setPage] = useState(1);
    const fetchMovies = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;

    const { data: movies, isLoading, error, numOfPages } = useFetch(fetchMovies)
    // const [searchPage, setSearchPage] = useState(false);
    // const [showSearch] = useState(true);

    // const fetchMovies = () => {
    //     fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`)
    //         .then(resp => {
    //             if (!resp.ok) {
    //                 throw Error('could not fetch the data')
    //             }
    //             return resp.json()
    //         })
    //         .then(data => {
    //             setMovies(data.results);
    //             setNumOfPages(data.total_pages);
    //             setSearchPage(false);
    //             setIsLoading(false);
    //         })
    //         .catch(err => {
    //             setError(err.message);
    //             setIsLoading(false);
    //         })
    // }

    // const searchMovies = (search) => {
    //     fetch(`
    //     https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${search}&page=1`)
    //         .then(resp => resp.json())
    //         .then(data => {
    //             setMovies(data.results);
    //             setNumOfPages(data.total_pages)
    //             setSearchPage(true)
    //         })
    // }

    // useEffect(() => {
    //     fetchMovies();
    //     return () => {
    //         setMovies('')
    //     }
    //     // eslint-disable-next-line
    // }, [page])

    // const darkTheme = createTheme({
    //     palette: {
    //         type: 'dark'
    //     },
    // })

    // const handlePageChange = (page) => {
    //     setPage(page);
    //     window.scroll(0, 0)
    // }


    return (
        <section className='content-container'>
            <Navbar backgroundColor='#000' position='static' />
            <div className='content-data'>
                {error && <div>{error}</div>}
                {isLoading && <h1 style={{ color: '#fff' }}>Loading...</h1>}
                {!isLoading && !error && movies && movies.map(movie => {
                    return <div key={movie.id}>
                        <Link to={`/moviedetails/${movie.id}`} style={{ textDecoration: 'none' }} onClick={() => window.scroll(0, 0)}>
                            <SingleComponent title={movie.title} poster={movie.poster_path} rating={movie.vote_average} release={movie.release_date} id={movie.id} />
                        </Link>
                    </div>
                })}
            </div>
            {/* {!isLoading && <span className={searchPage ? 'pagination hidden' : 'pagination'}>
                {/* <ThemeProvider theme={darkTheme}>
                    <Pagination count={numOfPages} color="secondary" onChange={(e) => handlePageChange(e.target.textContent)} showFirstButton showLastButton />
                </ThemeProvider> */}

        </section>
    )
}

export default Movies