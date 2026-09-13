import { Link, useParams } from 'react-router-dom'
import SaveButton from '../components/SaveButton.jsx'
import useMovieDetails from '../hooks/useMovieDetails.js'

function DetailField({ label, value }) {
  if (!value || value === 'N/A') return null

  return (
    <div className="detail-field">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

function MovieDetailsPage() {
  const { imdbID } = useParams()
  const { error, isLoading, movie } = useMovieDetails(imdbID)

  if (isLoading) {
    return <div aria-live="polite" className="details-status" role="status">Loading movie details…</div>
  }

  if (error) {
    return <div aria-live="assertive" className="details-status" role="alert"><h1>Movie unavailable</h1><p>{error}</p><Link to="/">Return to search</Link></div>
  }

  return (
    <article className="movie-details">
      <Link className="back-link" to="/">← Back to search</Link>
      <div className="details-layout">
        <div className="details-poster">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img alt={`${movie.Title} poster`} src={movie.Poster} />
          ) : (
            <span>Poster unavailable</span>
          )}
        </div>
        <div className="details-content">
          <p className="eyebrow">Movie details</p>
          <h1>{movie.Title}</h1>
          <p className="details-subtitle">{movie.Year} {movie.Genre !== 'N/A' && movie.Genre ? `· ${movie.Genre}` : ''}</p>
          <div className="details-save-controls">
            <SaveButton collection="favorites" movie={{ imdbID: movie.imdbID, poster: movie.Poster, title: movie.Title, year: movie.Year }} />
            <SaveButton collection="watchlist" movie={{ imdbID: movie.imdbID, poster: movie.Poster, title: movie.Title, year: movie.Year }} />
          </div>
          <dl className="details-list">
            <DetailField label="Runtime" value={movie.Runtime} />
            <DetailField label="Director" value={movie.Director} />
            <DetailField label="Actors" value={movie.Actors} />
            <DetailField label="IMDb rating" value={movie.imdbRating} />
          </dl>
          {movie.Plot && movie.Plot !== 'N/A' && <p className="details-plot">{movie.Plot}</p>}
          <a className="imdb-link" href={`https://www.imdb.com/title/${movie.imdbID}/`} rel="noreferrer" target="_blank">View on IMDb</a>
        </div>
      </div>
    </article>
  )
}

export default MovieDetailsPage