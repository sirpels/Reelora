import MovieGrid from '../components/MovieGrid.jsx'
import SearchBar from '../components/SearchBar.jsx'

function HomePage({ onSearchChange, searchState }) {
  const { debouncedQuery, error, isLoading, movies, query } = searchState
  const trimmedQuery = query.trim()

  let statusMessage = 'Search for a movie by title to get started.'
  if (trimmedQuery.length === 1) statusMessage = 'Enter at least 2 characters to search.'
  else if (isLoading) statusMessage = `Searching for “${debouncedQuery}”…`
  else if (error) statusMessage = error
  else if (debouncedQuery.length >= 2 && movies.length === 0) statusMessage = `No movies found for “${debouncedQuery}”.`

  return (
    <section className="home-page">
      <div className="home-intro">
        <p className="eyebrow">Discover your next watch</p>
        <h1>Find a film worth remembering.</h1>
        <p>Search the OMDb catalog by title.</p>
      </div>
      <SearchBar onChange={onSearchChange} value={query} />
      <div aria-live="polite" className="search-status" role={error ? 'alert' : 'status'}>{statusMessage}</div>
      {movies.length > 0 && <MovieGrid movies={movies} />}
    </section>
  )
}

export default HomePage