import { useContext, useEffect, useMemo, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ErrorMessage from "../components/ErrorMessage";
import FavoriteForm from "../components/FavoriteForm";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import { FavoritesContext } from "../context/FavoritesContext";
import { getMovies } from "../services/api";

export default function Home() {
  const { selectedMovie, setSelectedMovie } = useContext(FavoritesContext);
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("drama");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getMovies(category)
      .then((data) => setMovies(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [category]);

  const filteredMovies = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      return movies;
    }

    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchText)
    );
  }, [movies, search]);

  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">React Film Uygulaması</p>
          <h1>Filmleri keşfet, detaylara bak, favorilerini oluştur.</h1>
        </div>
      </section>

      <section className="controls">
        <SearchBar search={search} setSearch={setSearch} />
        <CategoryFilter category={category} setCategory={setCategory} />
      </section>

      <div className="content-layout">
        <div>
          {loading && <Loading />}
          {error && <ErrorMessage />}
          {!loading && !error && (
            <MovieList
              movies={filteredMovies}
              category={category}
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
            />
          )}
        </div>

        <FavoriteForm />
      </div>
    </div>
  );
}
