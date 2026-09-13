import MovieGrid from '../components/MovieGrid.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useSavedMovies } from '../context/SavedMoviesContext.jsx'

function WatchlistPage() {
  const { isLoading: isAuthLoading, user } = useAuth()
  const { error, isLoading, watchlist } = useSavedMovies()

  if (isAuthLoading || isLoading) return <div aria-live="polite" className="saved-status" role="status">Loading watchlist…</div>
  if (!user) return <section className="placeholder-page"><h1>Watchlist</h1><p>Sign in to save movies you want to watch later.</p></section>
  if (error) return <div aria-live="assertive" className="saved-status" role="alert">{error}</div>
  if (!watchlist.length) return <section className="placeholder-page"><h1>Watchlist</h1><p>You have not added any movies to your watchlist yet.</p></section>

  return <section className="saved-page"><p className="eyebrow">Your collection</p><h1>Watchlist</h1><MovieGrid collection="watchlist" movies={watchlist} /></section>
}

export default WatchlistPage