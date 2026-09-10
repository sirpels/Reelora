import { useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
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

function AppShell() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" onClick={closeMenu} to="/">Reelora</Link>
          <nav aria-label="Primary navigation" className="desktop-nav">
            {navigationItems.map((item) => <NavigationLink item={item} key={item.to} />)}
          </nav>
          <div className="header-actions">
            <button className="search-control" type="button">Search</button>
            <Link className="account-link" onClick={closeMenu} to="/login">Account / Login</Link>
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
            <button className="mobile-search" type="button">Search</button>
            {navigationItems.map((item) => <NavigationLink item={item} key={item.to} onNavigate={closeMenu} />)}
            <NavigationLink item={{ label: 'Account', to: '/login' }} onNavigate={closeMenu} />
          </nav>
        )}
      </header>
      <main className="page-content">
        <Routes>
          <Route element={<HomePage />} path="/" />
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
  return <BrowserRouter><AppShell /></BrowserRouter>
}

export default App
