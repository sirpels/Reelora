import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext.jsx'
import {
  addFavorite,
  addWatchlist,
  getFavorites,
  getWatchlist,
  removeFavorite,
  removeWatchlist,
} from '../services/firestoreService.js'

const SavedMoviesContext = createContext(null)

function friendlyFirestoreError() {
  return 'We could not update your saved movies. Please try again.'
}

function SavedMoviesProvider({ children }) {
  const { isLoading: isAuthLoading, user } = useAuth()
  const [favorites, setFavorites] = useState([])
  const [watchlist, setWatchlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [actionKey, setActionKey] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let isCurrentUser = true

    setFavorites([])
    setWatchlist([])
    setError('')

    if (isAuthLoading) {
      setIsLoading(true)
      return () => { isCurrentUser = false }
    }

    if (!user) {
      setIsLoading(false)
      return () => { isCurrentUser = false }
    }

    setIsLoading(true)
    Promise.all([getFavorites(user.uid), getWatchlist(user.uid)])
      .then(([loadedFavorites, loadedWatchlist]) => {
        if (isCurrentUser) {
          setFavorites(loadedFavorites)
          setWatchlist(loadedWatchlist)
        }
      })
      .catch(() => {
        if (isCurrentUser) setError('We could not load your saved movies. Please try again.')
      })
      .finally(() => {
        if (isCurrentUser) setIsLoading(false)
      })

    return () => { isCurrentUser = false }
  }, [isAuthLoading, user])

  const isSaved = (collectionName, imdbID) => {
    const movies = collectionName === 'favorites' ? favorites : watchlist
    return movies.some((movie) => movie.imdbID === imdbID)
  }

  const saveMovie = async (collectionName, movie) => {
    if (!user) return

    const key = `${collectionName}:${movie.imdbID}`
    setActionKey(key)
    setError('')
    try {
      if (collectionName === 'favorites') {
        await addFavorite(user.uid, movie)
        setFavorites((current) => [...current.filter((item) => item.imdbID !== movie.imdbID), movie])
      } else {
        await addWatchlist(user.uid, movie)
        setWatchlist((current) => [...current.filter((item) => item.imdbID !== movie.imdbID), movie])
      }
    } catch {
      setError(friendlyFirestoreError())
      throw new Error(friendlyFirestoreError())
    } finally {
      setActionKey('')
    }
  }

  const removeMovie = async (collectionName, imdbID) => {
    if (!user) return

    const key = `${collectionName}:${imdbID}`
    setActionKey(key)
    setError('')
    try {
      if (collectionName === 'favorites') {
        await removeFavorite(user.uid, imdbID)
        setFavorites((current) => current.filter((movie) => movie.imdbID !== imdbID))
      } else {
        await removeWatchlist(user.uid, imdbID)
        setWatchlist((current) => current.filter((movie) => movie.imdbID !== imdbID))
      }
    } catch {
      setError(friendlyFirestoreError())
      throw new Error(friendlyFirestoreError())
    } finally {
      setActionKey('')
    }
  }

  const value = {
    actionKey,
    error,
    favorites,
    isLoading: isAuthLoading || isLoading,
    isSaved,
    removeMovie,
    saveMovie,
    watchlist,
  }

  return <SavedMoviesContext.Provider value={value}>{children}</SavedMoviesContext.Provider>
}

function useSavedMovies() {
  const context = useContext(SavedMoviesContext)

  if (!context) throw new Error('useSavedMovies must be used within a SavedMoviesProvider.')

  return context
}

export { SavedMoviesProvider, useSavedMovies }