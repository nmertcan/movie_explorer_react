import axios from "axios";

export const movieCategories = [
  "drama",
  "classic",
  "action-adventure",
  "animation",
  "comedy",
  "family",
  "horror",
];

export const api = axios.create({
  baseURL: "https://api.sampleapis.com/movies",
  timeout: 10000,
});

const CACHE_MS = 60_000;
const categoryCache = new Map();

export function clearMovieCache() {
  categoryCache.clear();
}

export async function getMovies(category = "drama", client = api) {
  if (!movieCategories.includes(category)) {
    throw new Error("Unknown movie category");
  }

  // Cache only requests using the default API client.
  if (client !== api) {
    const response = await client.get(`/${category}`);
    if (!Array.isArray(response.data)) throw new Error("Invalid movie response");
    return response.data;
  }

  const cached = categoryCache.get(category);
  if (cached && cached.expiresAt > Date.now()) return cached.promise;

  const promise = client.get(`/${category}`).then((response) => {
    if (!Array.isArray(response.data)) throw new Error("Invalid movie response");
    return response.data;
  }).catch((error) => {
    if (categoryCache.get(category)?.promise === promise) categoryCache.delete(category);
    throw error;
  });
  categoryCache.set(category, { promise, expiresAt: Date.now() + CACHE_MS });
  return promise;
}

export async function getMovieById(id, client = api) {
  const movieLists = await Promise.all(
    movieCategories.map((category) => getMovies(category, client))
  );
  return movieLists.flat().find((movie) => String(movie.id) === String(id)) || null;
}
