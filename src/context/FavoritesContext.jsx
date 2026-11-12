import { createContext, useEffect, useMemo, useState } from "react";
import { getBrowserStorage, loadFavorites, saveFavorites } from "../utils/favoritesStorage";
import { addOrUpdateFavorite, removeFavoriteById } from "../utils/favorites";

export const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() =>
    loadFavorites(getBrowserStorage())
  );
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    saveFavorites(getBrowserStorage(), favorites);
  }, [favorites]);

  const addFavorite = (favorite) => {
    setFavorites((prev) => addOrUpdateFavorite(prev, favorite));
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => removeFavoriteById(prev, id));
  };

  const value = useMemo(
    () => ({
      favorites,
      selectedMovie,
      setSelectedMovie,
      addFavorite,
      removeFavorite,
    }),
    [favorites, selectedMovie]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
