export const FavoritesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD-TO-FAV':
            return { ...state, favorites: [...state.favorites, action.payload] }
        case 'REMOVE-FROM-FAV':
            return { ...state, favorites: state.favorites.filter(prod => prod.id !== action.payload.id) }
        default:
            return state;
    }
}