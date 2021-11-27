import { useState } from 'react'
import SingleComponent from '../../Stateless/SingleComponent/SingleComponent';
import './Search.css';
import Navbar from '../../Stateful/Navbar/Navbar';



const Search = () => {
    const [data, setData] = useState([]);
    const [searchInputError, setSearchInputError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);



    const fetchData = () => {
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`)
            .then(resp => {
                if (!resp.ok) {
                    throw Error('could not fetch the data')
                }
                return resp.json()
            })
            .then(data => {
                setData(data.results);
            })
            .catch(err => {
                setError(err.message);
            })
    }

    const searchData = (searchTerm) => {
        searchTerm = searchTerm.trim();

        if (searchTerm === '') {
            setSearchInputError(
                'Search Term is Empty'
            );
            return;
        }

        setSearchInputError(null);
        fetchData(searchTerm);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearched(true);
        searchData(searchTerm);
    }

    const displayEmptyResultMsg = () => {
        if (searchInputError) {
            return <p className="search-error-message">{searchInputError}</p>;
        } else if (data && data.length === 0) {
            return (
                <p className="search-error-message">
                    Nothing Found
                </p>
            );
        }
    };

    return (
        <>
            <Navbar backgroundColor='#000' position='static' />
            <section className='search-container'>
                <form className='search-form' onSubmit={handleSubmit}>
                    <h1 className='search-title'>GET INFO ON MILLIONS OF TITLES.<br></br>EXPLORE NOW</h1>
                    <span className='form-span'>
                        <div className='search-input-container'>
                            <input className='search-input' type="text" placeholder='Search' value={searchTerm} onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }} />
                            {searched && data && displayEmptyResultMsg()}
                        </div>
                        <button type='submit'>Search</button>
                    </span>
                </form>
                <div className='search-data'>
                    {error && <div>{error}</div>}
                    {data && data.map(data => {
                        return <div key={data.id}>
                            <SingleComponent content={data} title={data.title || data.name} poster={data.poster_path} rating={data.vote_average} release={data.release_date || data.first_air_date} id={data.id} />
                        </div>
                    })}
                </div>
            </section>
        </>
    )
}

export default Search;
