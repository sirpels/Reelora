import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { SavedMoviesProvider } from './context/SavedMoviesContext.jsx'
import MovieGrid from './components/MovieGrid.jsx'
import SearchBar from './components/SearchBar.jsx'
import useMovieSearch from './hooks/useMovieSearch.js'
import FavoritesPage from './pages/FavoritesPage.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import MovieDetailsPage from './pages/MovieDetailsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import WatchlistPage from './pages/WatchlistPage.jsx'

const navigationItems = [
  { label: 'Home', to: '/' },
  { label: 'Watchlist', to: '/watchlist' },
  { label: 'Favorites', to: '/favorites' },
]

function NavigationLink({ item, onNavigate }) {
  return (
    <NavLink
      className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
      onClick={onNavigate}
      to={item.to}
    >
      {item.label}
    </NavLink>
  )
}

function SearchStatus({ error, isLoading, movies, query, debouncedQuery }) {
  const trimmedQuery = query.trim()
  let statusMessage = 'Search for a movie by title.'

  if (trimmedQuery.length === 1) statusMessage = 'Enter at least 2 characters to search.'
  else if (isLoading) statusMessage = `Searching for “${debouncedQuery}”…`
  else if (error) statusMessage = error
  else if (debouncedQuery.length >= 2 && movies.length === 0) statusMessage = `No movies found for “${debouncedQuery}”.`

  return <div aria-live="polite" className="search-status" role={error ? 'alert' : 'status'}>{statusMessage}</div>
}

function NavbarSearch({ searchState, onChange, onClose }) {
  const { debouncedQuery, error, isLoading, movies, query } = searchState

  return (
    <div className="navbar-search-panel" onClick={(event) => event.stopPropagation()}>
      <div className="navbar-search-heading">
        <SearchBar autoFocus inputId="navbar-movie-search" onChange={onChange} value={query} />
        <button aria-label="Close search" className="search-close" onClick={onClose} type="button">Close</button>
      </div>
      <SearchStatus debouncedQuery={debouncedQuery} error={error} isLoading={isLoading} movies={movies} query={query} />
      {movies.length > 0 && <MovieGrid movies={movies} onMovieNavigate={onClose} />}
    </div>
  )
}

function AccountMenu({ onLogout, user }) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) setIsOpen(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleLogout = async () => {
    await onLogout()
    setIsOpen(false)
  }

  return (
    <div className="account-menu" ref={menuRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={isOpen ? 'Close account menu' : 'Open account menu'}
        className="account-icon-button"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <svg aria-hidden="true" className="account-icon" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="3.25" />
          <path d="M5.5 19c.8-3.1 3-4.75 6.5-4.75s5.7 1.65 6.5 4.75" />
        </svg>
      </button>
      {isOpen && (
        <div aria-label="Account menu" className="account-dropdown" role="menu">
          <span className="account-dropdown-email" title={user.email}>{user.email}</span>
          <button aria-label="Log out of Reelora" className="account-button" onClick={handleLogout} role="menuitem" type="button">Logout</button>
        </div>
      )}
    </div>
  )
}

function AppShell() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchState = { query, ...useMovieSearch(query) }
  const { isLoading, logout, user } = useAuth()
  const [logoutError, setLogoutError] = useState('')
  const closeMenu = () => setIsMenuOpen(false)
  const openSearch = () => {
    closeMenu()
    setIsSearchOpen(true)
  }
  const closeSearch = () => setIsSearchOpen(false)

  const handleLogout = async () => {
    setLogoutError('')
    try {
      await logout()
      closeMenu()
    } catch (error) {
      setLogoutError(error.message)
    }
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" onClick={closeMenu} to="/">Reelora</Link>
          <nav aria-label="Primary navigation" className="desktop-nav">
            {navigationItems.map((item) => <NavigationLink item={item} key={item.to} />)}
          </nav>
          <div className="header-actions">
            <button aria-expanded={isSearchOpen} className="search-control" onClick={openSearch} type="button">Search</button>
            {isLoading ? (
              <span aria-live="polite" className="account-status">Checking account…</span>
            ) : user ? (
              <AccountMenu onLogout={handleLogout} user={user} />
            ) : (
              <Link className="account-link" onClick={closeMenu} to="/login">Account / Login</Link>
            )}
            <button
              aria-controls="mobile-navigation"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="menu-toggle"
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
              type="button"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <nav aria-label="Mobile navigation" className="mobile-nav" id="mobile-navigation">
            <button aria-expanded={isSearchOpen} className="mobile-search" onClick={openSearch} type="button">Search</button>
            {navigationItems.map((item) => <NavigationLink item={item} key={item.to} onNavigate={closeMenu} />)}
            {isLoading ? (
              <span aria-live="polite" className="account-status">Checking account…</span>
            ) : user ? (
              null
            ) : (
              <NavigationLink item={{ label: 'Account', to: '/login' }} onNavigate={closeMenu} />
            )}
          </nav>
        )}
      </header>
      {isSearchOpen && (
        <div className="navbar-search-overlay" onClick={closeSearch}>
          <NavbarSearch onChange={setQuery} onClose={closeSearch} searchState={searchState} />
        </div>
      )}
      {logoutError && <div aria-live="polite" className="header-error" role="alert">{logoutError}</div>}
      <main className="page-content">
        <Routes>
          <Route element={<HomePage searchState={searchState} onSearchChange={setQuery} />} path="/" />
          <Route element={<MovieDetailsPage />} path="/movies/:imdbID" />
          <Route element={<FavoritesPage />} path="/favorites" />
          <Route element={<WatchlistPage />} path="/watchlist" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<SignupPage />} path="/signup" />
          <Route element={<NotFoundPage />} path="*" />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return <BrowserRouter><AuthProvider><SavedMoviesProvider><AppShell /></SavedMoviesProvider></AuthProvider></BrowserRouter>
}

export default App
