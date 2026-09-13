import { useEffect, useState } from 'react'
import useDebouncedValue from './useDebouncedValue.js'
import { searchMovies } from '../services/omdbService.js'

function useMovieSearch(query) {
  const debouncedQuery = useDebouncedValue(query.trim())
  const [state, setState] = useState({ error: '', isLoading: false, movies: [] })

  useEffect(() => {
    const controller = new AbortController()
    const normalizedQuery = debouncedQuery.trim()

    if (normalizedQuery.length < 2) {
      setState({ error: '', isLoading: false, movies: [] })
      return () => controller.abort()
    }

    let isCurrentRequest = true
    setState((currentState) => ({ ...currentState, error: '', isLoading: true }))

    searchMovies(normalizedQuery, controller.signal)
      .then((movies) => {
        if (isCurrentRequest) setState({ error: '', isLoading: false, movies })
      })
      .catch((error) => {
        if (isCurrentRequest && error.name !== 'AbortError') {
          setState({ error: error.message, isLoading: false, movies: [] })
        }
      })

    return () => {
      isCurrentRequest = false
      controller.abort()
    }
  }, [debouncedQuery])

  return { ...state, debouncedQuery }
}

export default useMovieSearch