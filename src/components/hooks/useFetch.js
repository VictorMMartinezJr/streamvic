import { useState, useEffect } from 'react';

const useFetchDetails = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const abortController = new AbortController()
        fetch(url, { signal: abortController.signal })
            .then(resp => {
                if (!resp.ok) {
                    throw Error('Could not fetch the data for the resource');
                }
                return resp.json()
            })
            .then(data => {
                setData(data.results);
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
            abortController.abort();
        }
        // eslint-disable-next-line
    }, [url])

    return { data, error, isLoading }
}

export default useFetchDetails;