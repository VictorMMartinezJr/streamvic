import { createContext, useReducer } from 'react';
import { FavoritesReducer } from '../context/Reducer';

export const Favs = createContext();

export const GlobalContext = ({ children }) => {
    const [state, dispatch] = useReducer(FavoritesReducer, {
        favorites: [],
    })

    return (
        <Favs.Provider value={{ state, dispatch, }}>
            {children}
        </Favs.Provider>
    )

}

export default GlobalContext