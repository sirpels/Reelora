import { Link } from 'react-router-dom'
import SaveButton from './SaveButton.jsx'

function MovieCard({ collection, movie, onMovieNavigate }) {
  const hasPoster = movie.poster && movie.poster !== 'N/A'

  return (
    <article className="movie-card">
      <Link className="movie-card-link" onClick={onMovieNavigate} to={`/movies/${movie.imdbID}`}>
        <div className="movie-poster">
          {hasPoster ? <img alt={`${movie.title} poster`} src={movie.poster} /> : <span>Poster unavailable</span>}
        </div>
        <div className="movie-card-content">
          <h2>{movie.title}</h2>
          <p>{movie.year}</p>
          <small>{movie.imdbID}</small>
        </div>
      </Link>
      <div className="movie-card-actions">
        {collection ? (
          <SaveButton collection={collection} movie={movie} />
        ) : (
          <>
            <SaveButton collection="favorites" movie={movie} />
            <SaveButton collection="watchlist" movie={movie} />
          </>
        )}
      </div>
    </article>
  )
}

export default MovieCard