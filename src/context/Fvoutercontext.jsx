import { createContext, useState } from "react";

export const FavoriteContext = createContext();


const FavoriteContextProvider = ({ children }) => {
    const[favorites, setFavorites] = useState([]);

      const addFavorite = (recipe) => {
    setFavorites([...favorites, recipe]);
  };
const removeFavorite = (id) => {

  setFavorites(
    favorites.filter((recipe) => recipe.id !== id)
  );}


    return (
        <FavoriteContext.Provider value={{favorites, setFavorites, addFavorite, removeFavorite}}>
            {children}
        </FavoriteContext.Provider>
    )
}
export default FavoriteContextProvider;