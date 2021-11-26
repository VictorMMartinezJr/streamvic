import { createContext, useState, useEffect } from 'react';

export const Favs = createContext();

export const GlobalContext = ({ children }) => {
    const [favorites, setFavorites] = useState(localStorage.getItem('favs') ? JSON.parse(localStorage.getItem('favs')) : []);

    useEffect(() => {
        localStorage.setItem('favs', JSON.stringify(favorites));
        // eslint-disable-next-line
    }, [])

    return (
        <Favs.Provider value={{ favorites, setFavorites }}>
            {children}
        </Favs.Provider>
    )

}

export default GlobalContext