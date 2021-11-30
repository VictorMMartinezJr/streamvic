import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [numOfPages, setNumOfPages] = useState(10);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal })
            .then(resp => {
                if (!resp.ok) {
                    throw Error('Could not fetch the data for the resource');
                }
                return resp.json()
            })
            .then(data => {
                setData(data.results);
                setNumOfPages(data.total_pages);
                setIsLoading(false);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch Aborted')
                } else {
                    setError(err.message);
                    setIsLoading(false);
                }
            });

        return () => {
            abortCont.abort();
        };

        // eslint-disable-next-line
    }, [url])

    return { data, error, isLoading, numOfPages }
}

export default useFetch;