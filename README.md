# Reelora

Reelora is a React movie discovery app using OMDb for search and details, Firebase Authentication for email/password accounts, and Cloud Firestore for user-scoped Favorites and Watchlist collections.

## Stack

- React and JavaScript
- Vite
- Tailwind CSS v4 through `@tailwindcss/vite`
- `react-router-dom`
- OMDb API with native `fetch`
- Firebase Authentication and Firestore

## Implemented Features

- Guest browsing, OMDb movie search, and movie details by IMDb ID.
- Search minimum of two characters with a 450 ms debounce.
- AbortController cleanup and latest-request protection for changing searches.
- Loading, empty, API-error, invalid-details, and not-found states.
- Email/password sign-up, login, logout, and persistent auth state through `onAuthStateChanged`.
- Authenticated account icon with an email/logout dropdown.
- User-scoped Favorites and Watchlist with separate add/remove actions.
- Guest save message: `Please sign in to save movies.`
- Responsive desktop and mobile navigation and search.
- Accessible labels, focus states, status/alert regions, semantic details markup, and keyboard-accessible controls.

## Saved Movie Data

Favorites and Watchlist use separate paths:

```text
users/{uid}/favorites/{imdbID}
users/{uid}/watchlist/{imdbID}
```

Each saved document stores only:

- `imdbID`
- `title`
- `poster`
- `year`

The application uses fetch-on-mount Firestore reads and local state updates after successful writes/removes. It does not use realtime listeners.

Firestore rules are published in the Firebase project and restrict access to the authenticated user's own UID path:

```text
request.auth != null && request.auth.uid == uid
```

No local `firestore.rules` file is currently tracked in this repository.

## Environment Variables

Create a local `.env` from `.env.example` and provide values for:

```text
VITE_OMDB_API_KEY
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

Never commit `.env`. Frontend environment values are configuration, not server-side secrets.

## Routes

```text
/                    Home search
/movies/:imdbID      Movie details
/favorites           Favorites
/watchlist           Watchlist
/login               Login
/signup              Sign up
```

Guests are not redirected from Favorites or Watchlist; they see a sign-in explanation instead.

## Project Structure

```text
src/
  components/        Search, movie cards/grids, save controls
  context/            Auth and saved-movie context
  firebase/           Firebase client configuration
  hooks/              Debounce, search, and details hooks
  pages/              Routed page components
  services/           OMDb, auth, and Firestore services
  utils/              Shared utilities
```

The project intentionally excludes streaming/downloads, trailers, recommendations, reviews/comments, social features, payments, admin tools, pagination, filters, sorting, and external state-management libraries.

## Development

```bash
npm install
npm run dev
npm run build
```
