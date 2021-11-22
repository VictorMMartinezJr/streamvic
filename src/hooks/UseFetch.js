import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(url)
            .then(resp => {
                if (!resp.ok) {
                    throw Error('Could not fetch the data for the resource');
                }
                return resp.json()
            })
            .then(data => {
                setData(data.results.splice(0, 5));
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            })
    }, [url])

    return { data, error, isLoading }
}

export default useFetch;