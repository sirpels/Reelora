import MovieGrid from '../components/MovieGrid.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useSavedMovies } from '../context/SavedMoviesContext.jsx'

function FavoritesPage() {
  const { isLoading: isAuthLoading, user } = useAuth()
  const { error, favorites, isLoading } = useSavedMovies()

  if (isAuthLoading || isLoading) return <div aria-live="polite" className="saved-status" role="status">Loading favorites…</div>
  if (!user) return <section className="placeholder-page"><h1>Favorites</h1><p>Sign in to save and manage your favorite movies.</p></section>
  if (error) return <div aria-live="assertive" className="saved-status" role="alert">{error}</div>
  if (!favorites.length) return <section className="placeholder-page"><h1>Favorites</h1><p>You have not saved any favorite movies yet.</p></section>

  return <section className="saved-page"><p className="eyebrow">Your collection</p><h1>Favorites</h1><MovieGrid collection="favorites" movies={favorites} /></section>
}

export default FavoritesPage