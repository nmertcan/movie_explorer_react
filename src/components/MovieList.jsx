import MovieCard from "./MovieCard";

export default function MovieList({ movies, category, selectedMovie, setSelectedMovie }) {
  if (movies.length === 0) {
    return (
      <div className="message-box">
        <h2>Film bulunamadı.</h2>
      </div>
    );
  }

  return (
    <section className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          category={category}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      ))}
    </section>
  );
}
