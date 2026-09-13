import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore'
import firebaseApp from '../firebase/config.js'

const firestore = getFirestore(firebaseApp)

function moviesCollection(uid, collectionName) {
  return collection(firestore, 'users', uid, collectionName)
}

function movieDocument(uid, collectionName, imdbID) {
  return doc(firestore, 'users', uid, collectionName, imdbID)
}

function movieData(movie) {
  return {
    imdbID: movie.imdbID,
    poster: movie.poster || 'N/A',
    title: movie.title,
    year: movie.year,
  }
}

async function getMovies(uid, collectionName) {
  const snapshot = await getDocs(moviesCollection(uid, collectionName))
  return snapshot.docs.map((movie) => movie.data())
}

export function getFavorites(uid) {
  return getMovies(uid, 'favorites')
}

export function getWatchlist(uid) {
  return getMovies(uid, 'watchlist')
}

export function addFavorite(uid, movie) {
  return setDoc(movieDocument(uid, 'favorites', movie.imdbID), movieData(movie))
}

export function removeFavorite(uid, imdbID) {
  return deleteDoc(movieDocument(uid, 'favorites', imdbID))
}

export function addWatchlist(uid, movie) {
  return setDoc(movieDocument(uid, 'watchlist', movie.imdbID), movieData(movie))
}

export function removeWatchlist(uid, imdbID) {
  return deleteDoc(movieDocument(uid, 'watchlist', imdbID))
}