import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";
import { FavoritesContext } from "../context/FavoritesContext";
import { getMovieById } from "../services/api";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { setSelectedMovie } = useContext(FavoritesContext);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getMovieById(id, undefined, category)
      .then((foundMovie) => setMovie(foundMovie))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id, category]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (!movie) {
    return (
      <div className="message-box">
        <h2>Film bulunamadı.</h2>
        <Link to="/">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  const handleSelectFavorite = () => {
    setSelectedMovie(movie);
    navigate("/");
  };

  return (
    <div className="detail-page">
      <img src={movie.posterURL} alt={movie.title} />

      <section className="detail-info">
        <p className="eyebrow">Film Detayı</p>
        <h1>{movie.title}</h1>

        <div className="detail-list">
          <p>
            <strong>Yıl:</strong> {movie.year || "Bilgi yok"}
          </p>
          <p>
            <strong>Puan:</strong> {movie.imdbRating || "Bilgi yok"}
          </p>
          <p>
            <strong>Yönetmen:</strong> {movie.director || "Bilgi yok"}
          </p>
          <p>
            <strong>Oyuncular:</strong> {movie.actors || "Bilgi yok"}
          </p>
        </div>

        <div className="detail-actions">
          <button type="button" onClick={() => navigate(-1)}>
            Geri Dön
          </button>
          <button type="button" onClick={handleSelectFavorite}>
            Bu Filmi Favoriler İçin Seç
          </button>
        </div>
      </section>
    </div>
  );
}
