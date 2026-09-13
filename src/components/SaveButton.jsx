import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useSavedMovies } from '../context/SavedMoviesContext.jsx'

const collectionLabels = {
  favorites: 'Favorites',
  watchlist: 'Watchlist',
}

function SaveButton({ collection, movie }) {
  const { user } = useAuth()
  const { actionKey, isSaved, removeMovie, saveMovie } = useSavedMovies()
  const [guestMessage, setGuestMessage] = useState(false)
  const [saveError, setSaveError] = useState('')
  const label = collectionLabels[collection]
  const saved = isSaved(collection, movie.imdbID)
  const isBusy = actionKey === `${collection}:${movie.imdbID}`

  const handleClick = async () => {
    if (!user) {
      setGuestMessage(true)
      return
    }

    setGuestMessage(false)
    setSaveError('')
    try {
      if (saved) await removeMovie(collection, movie.imdbID)
      else await saveMovie(collection, movie)
    } catch {
      setSaveError('We could not update your saved movies. Please try again.')
    }
  }

  return (
    <div className="save-control">
      <button
        aria-label={`${saved ? 'Remove from' : 'Add to'} ${label}`}
        className="save-button"
        disabled={isBusy}
        onClick={handleClick}
        type="button"
      >
        {isBusy ? 'Saving…' : saved ? `Remove from ${label}` : `Add to ${label}`}
      </button>
      {guestMessage && <span aria-live="polite" className="guest-save-message">Please sign in to save movies.</span>}
      {saveError && <span aria-live="polite" className="save-error" role="alert">{saveError}</span>}
    </div>
  )
}

export default SaveButton