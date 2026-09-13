import MovieCard from './MovieCard.jsx'

function MovieGrid({ collection, movies, onMovieNavigate }) {
  return (
    <div aria-label="Movie search results" className="movie-grid">
      {movies.map((movie) => <MovieCard collection={collection} key={movie.imdbID} movie={movie} onMovieNavigate={onMovieNavigate} />)}
    </div>
  )
}

export default MovieGrid