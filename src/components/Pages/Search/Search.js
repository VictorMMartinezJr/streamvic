import { useState, useEffect } from 'react'
import SingleComponent from '../../Stateless/SingleComponent/SingleComponent';
import './Search.css';
import Navbar from '../../Stateful/Navbar/Navbar';
import Pagination from '../../Stateless/Pagination/Pagination';



const Search = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    const SearchData = () => {
        if (!searchTerm) {
            return setIsLoading(false)
        } else {
            fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}&page=${page}&include_adult=false`)
                .then(resp => {
                    if (!resp.ok) {
                        throw Error('could not fetch the data')
                    }
                    return resp.json()
                })
                .then(data => {
                    setData(data.results);
                    setIsLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setIsLoading(false);
                })
        }
    }

    useEffect(() => {
        SearchData();
        return () => {
            setData('')
        }
        // eslint-disable-next-line
    }, [page])

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

    const handleSubmit = (e) => {
        e.preventDefault();
        SearchData()
        console.log(data)
    }


    return (
        <>
            <Navbar backgroundColor='#000' position='static' />
            <section className='search-container'>
                <form className='search-form' onSubmit={handleSubmit}>
                    <h1 className='search-title'>GET INFO ON MILLIONS OF TITLES. EXPLORE NOW</h1>
                    <span>
                        <input type="text" placeholder='Search' value={searchTerm} onChange={(e) => {
                            setSearchTerm(e.target.value)
                            console.log(searchTerm)
                        }} />
                        <button type='submit'>Search</button>
                    </span>
                </form>
                <div className='search-data'>
                    {error && <div>{error}</div>}
                    {isLoading && <h1 style={{ color: '#fff' }}>Loading...</h1>}
                    {!isLoading && !error && data && data.map(data => {
                        return <div key={data.id}>
                            <SingleComponent content={data} title={data.title || data.name} poster={data.poster_path} rating={data.vote_average} release={data.release_date || data.first_air_date} id={data.id} />
                        </div>
                    })}
                </div>
                {!isLoading && !error && searchTerm && data && <Pagination page={page} handleChoosePage={handleChoosePage} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} maxPages={5} />}
            </section>
        </>
    )
}

export default Search;
