export function addOrUpdateFavorite(favorites, favorite) {
  const existing = favorites.some((movie) => movie.id === favorite.id);
  return existing
    ? favorites.map((movie) => movie.id === favorite.id ? favorite : movie)
    : [...favorites, favorite];
}

export function removeFavoriteById(favorites, id) {
  return favorites.filter((movie) => movie.id !== id);
}

export function validateFavorite({ selectedMovie, name, description }) {
  const errors = {};
  if (!selectedMovie) errors.movie = "Önce bir film seçmelisin.";
  if (!name.trim()) errors.name = "Favori ismi zorunludur.";
  if (!description.trim()) errors.description = "Açıklama zorunludur.";
  else if (description.trim().length < 10) errors.description = "Açıklama en az 10 karakter olmalıdır.";
  return errors;
}
