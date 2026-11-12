import { Link } from "react-router-dom";

export default function MovieCard({ movie, category, selectedMovie, setSelectedMovie }) {
  const isSelected = selectedMovie?.id === movie.id;

  return (
    <article className={isSelected ? "movie-card selected" : "movie-card"}>
      <img src={movie.posterURL} alt={movie.title} />

      <div className="movie-card-content">
        <h3>{movie.title}</h3>
        <p>{movie.year || "Yıl bilgisi yok"}</p>

        <div className="card-actions">
          <Link to={`/movie/${movie.id}?category=${encodeURIComponent(category)}`}>Detay</Link>
          <button type="button" onClick={() => setSelectedMovie(movie)}>
            Favori İçin Seç
          </button>
        </div>
      </div>
    </article>
  );
}
