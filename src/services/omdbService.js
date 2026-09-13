const OMDB_ENDPOINT = 'https://www.omdbapi.com/'

export async function searchMovies(query, signal) {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY?.trim()

  if (!apiKey) {
    throw new Error('Movie search is not configured yet.')
  }

  const params = new URLSearchParams({
    apikey: apiKey,
    page: '1',
    s: query,
  })

  let response
  try {
    response = await fetch(`${OMDB_ENDPOINT}?${params}`, { signal })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error('We could not reach movie search right now.')
  }

  if (!response.ok) throw new Error('Movie search is temporarily unavailable.')

  const data = await response.json()
  if (data.Response === 'False') {
    if (data.Error === 'Movie not found!') return []
    throw new Error('Movie search is temporarily unavailable.')
  }

  return (data.Search || []).map((movie) => ({
    imdbID: movie.imdbID,
    poster: movie.Poster,
    title: movie.Title,
    year: movie.Year,
  }))
}

export async function getMovieDetails(imdbID, signal) {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY?.trim()

  if (!apiKey) {
    throw new Error('Movie details are not configured yet.')
  }

  const params = new URLSearchParams({
    apikey: apiKey,
    i: imdbID,
    plot: 'full',
  })

  let response
  try {
    response = await fetch(`${OMDB_ENDPOINT}?${params}`, { signal })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new Error('We could not reach movie details right now.')
  }

  if (!response.ok) throw new Error('Movie details are temporarily unavailable.')

  let data
  try {
    data = await response.json()
  } catch {
    throw new Error('Movie details are temporarily unavailable.')
  }

  if (data.Response === 'False') {
    throw new Error('We could not find that movie.')
  }

  return data
}