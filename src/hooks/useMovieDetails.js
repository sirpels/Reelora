import { useEffect, useState } from 'react'
import { getMovieDetails } from '../services/omdbService.js'

function useMovieDetails(imdbID) {
  const [state, setState] = useState({
    error: '',
    isLoading: Boolean(imdbID),
    movie: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    if (!imdbID) {
      setState({ error: 'That movie link is not valid.', isLoading: false, movie: null })
      return () => controller.abort()
    }

    let isCurrentRequest = true
    setState({ error: '', isLoading: true, movie: null })

    getMovieDetails(imdbID, controller.signal)
      .then((movie) => {
        if (isCurrentRequest) setState({ error: '', isLoading: false, movie })
      })
      .catch((error) => {
        if (isCurrentRequest && error.name !== 'AbortError') {
          setState({ error: error.message, isLoading: false, movie: null })
        }
      })

    return () => {
      isCurrentRequest = false
      controller.abort()
    }
  }, [imdbID])

  return state
}

export default useMovieDetails