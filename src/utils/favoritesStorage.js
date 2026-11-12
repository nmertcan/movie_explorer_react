export function getBrowserStorage() {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

export const FAVORITES_STORAGE_KEY = "movie-explorer:favorites:v1";

export function loadFavorites(storage) {
  try {
    const raw = storage?.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((favorite) =>
      favorite &&
      (typeof favorite.id === "string" || typeof favorite.id === "number") &&
      typeof favorite.customName === "string" &&
      typeof favorite.customDescription === "string" &&
      favorite.originalData &&
      typeof favorite.originalData === "object"
    );
  } catch {
    return [];
  }
}

export function saveFavorites(storage, favorites) {
  if (!storage) return false;
  try {
    storage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    return true;
  } catch {
    return false;
  }
}
