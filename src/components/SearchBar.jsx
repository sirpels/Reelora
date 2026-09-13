function SearchBar({ autoFocus = false, inputId = 'movie-search', onChange, value }) {
  return (
    <div className="search-bar">
      <label htmlFor={inputId}>Search movies</label>
      <input
        autoComplete="off"
        autoFocus={autoFocus}
        id={inputId}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by movie title"
        type="search"
        value={value}
      />
    </div>
  )
}

export default SearchBar