# Reelora — AI Development Evidence

## 1. Project

Reelora is a movie discovery application. Users can search OMDb, view movie details, create an account, save Favorites, and save a Watchlist. Guests can browse, search, and view movie details.

The project uses React and JavaScript with Vite, Tailwind CSS v4, `react-router-dom`, the OMDb API, Firebase Authentication, and Firebase Firestore.

## 2. AI Tools and Roles

### ChatGPT

ChatGPT was used as a planning, tutoring, and review assistant. It helped clarify requirements, challenge implementation decisions, interpret AI-generated implementation, plan testing and next steps, and review UX decisions.

### Claude

Claude contributed to architecture and UI thinking, UI ideas, and guidance or prompts for implementation. It was not the primary code implementation assistant.

### VS Code AI Agent

The VS Code AI Agent was the main implementation assistant. It inspected project files, implemented requested features, modified the appropriate files, ran builds and diagnostics, performed browser checks when requested, and reported implementation and verification results.

## 3. Development Workflow

The workflow was:

```text
Requirements/decision
→ AI planning/review
→ prompt to VS Code AI Agent
→ implementation
→ browser/manual testing
→ review
→ correction if needed
→ verification
```

The human developer remained responsible for defining requirements, making product and architecture decisions, reviewing AI output, testing the application, and accepting or rejecting changes.

## 4. Major Prompts / Development Stages

### 1. Project foundation

The requirement was to create a focused Vite React foundation with the approved dependencies, Tailwind CSS v4, routing, placeholder pages, responsive navigation, environment placeholders, and Git ignore rules. The resulting project included the React shell, approved routes, responsive navigation, and the initial folder structure.

### 2. OMDb search

The requirement was to implement native-fetch OMDb title search with a two-character minimum, approximately 450 ms debounce, first-page results, loading/empty/error states, and stale-request protection. The resulting feature includes `omdbService`, `useDebouncedValue`, `useMovieSearch`, `SearchBar`, `MovieCard`, and `MovieGrid`.

### 3. Movie details

The requirement was to fetch full movie details by IMDb ID through `/movies/:imdbID`, display the available movie metadata, handle invalid IDs, and preserve responsive and accessible states. The resulting feature includes the details service function, `useMovieDetails`, the details page, and the IMDb link.

### 4. Firebase Authentication

The requirement was to add email/password sign-up, login, logout, persistent auth state, friendly validation/errors, and authenticated account behavior without adding Firestore logic. The resulting feature includes `AuthContext`, `authService`, authentication pages, and auth-aware header behavior.

### 5. Firestore Favorites and Watchlist

The requirement was to add separate user-scoped Favorites and Watchlist collections using minimal movie data, local state updates, fetch-on-mount reads, guest messaging, and no realtime listeners. The resulting feature includes `firestoreService`, `SavedMoviesContext`, `SaveButton`, saved pages, and save controls on movie cards and details.

### 6. Navbar Search

The requirement was to make Search usable from every normal page without creating a second search implementation. The final feature opens a navbar search panel on the current page, reuses the existing search hook and OMDb flow, displays existing movie cards, and closes before navigating to movie details.

### 7. Account dropdown / final UX

The requirement was to replace the authenticated inline email and Logout controls with a user icon and an account dropdown. The final account UI shows the email and a simple Logout action only inside the dropdown. It supports outside-click and Escape closing, accessible button state, logout cleanup, and mobile layout.

### 8. README / final verification

The final verification found that the README was still the default Vite template documentation. It was replaced with documentation describing the actual Reelora stack, routes, features, saved data, environment variables, security model, project structure, and scope exclusions.

## 5. Real AI-Assisted Corrections

### Navbar Search UX

The navbar Search button initially did not provide usable search outside Home. The first solution navigated to Home and focused the existing search input. The developer tested that behavior and rejected it because users should be able to search from Favorites, Watchlist, movie details, and other pages without being sent back to Home.

The implementation was changed so Search opens directly from the navbar on the current page while reusing the existing movie-search hook, debounce, OMDb service, result states, MovieGrid, and MovieCard. The revised behavior was manually and browser tested.

### README documentation

During final verification, the README was still the default Vite documentation rather than documentation for Reelora. It was replaced with documentation describing the actual project and implemented behavior.

### Logout UX

Logout needed to be a simple text action instead of a prominent button. Its styling was changed to remove the border and background treatment, and its text weight was adjusted to be slightly heavier than the account email.

## 6. Testing and Verification

The following verification was performed during development:

- OMDb search was tested with real movie queries including `batman`, including minimum-length and no-results behavior.
- Movie details were tested with valid and invalid IMDb IDs, including details navigation from a movie card.
- Authentication forms were tested for invalid input, and Firebase sign-up, login, persistence after refresh, and logout were browser tested after the Firebase provider was configured.
- Firestore save/remove behavior was tested with a real authenticated test account.
- Favorites and Watchlist independence was tested by saving movies to separate collections.
- Guest save behavior was tested without redirecting and with the required sign-in message.
- Favorites and Watchlist guest, empty, populated, loading, and removal states were checked.
- Navbar Search was tested from Favorites, Watchlist, movie details, Login, and Home. Desktop and mobile Search opened on the current page, reused the existing search flow, and displayed results.
- The account dropdown was tested for authenticated icon display, email visibility inside the dropdown, outside-click closing, Escape closing, mobile layout, semibold text-only Logout, and return to the guest header after logout.
- Responsive behavior was checked at approximately 390px and on desktop-sized viewports.
- Browser-assisted checks were used for route, DOM, interaction, network-response, and console checks.
- `npm run build` passed after the implementation stages and final corrections.
- Static compiler diagnostics reported no errors in the checked application files.
- There is no lint script configured in the project, so no lint command was claimed or run.
- A small number of external poster URL failures and Firebase channel-abort messages were observed during browser sessions; these were external or connection-cleanup messages rather than application implementation failures.
- README contents were reviewed against the implemented project and corrected where they were inaccurate.

These checks were a combination of manual interaction and browser-assisted verification. They were not a separate automated test-suite run.

## 7. Human Decisions

The developer:

- Defined the requirements and six-hour scope.
- Reviewed AI-generated plans and implementation.
- Chose the lightweight React, context, hook, and service architecture.
- Tested the application manually and with browser-assisted checks.
- Identified UX problems, including the first navbar Search behavior.
- Rejected an implementation when it did not meet the intended product UX.
- Decided which changes were acceptable and which features remained out of scope.
- Performed the final manual verification and approval process.

## 8. Final Status

The Reelora implementation is complete for the defined project scope. The final core manual and browser-assisted checks passed, and the production build passed.

The project is stored in Git and has a configured GitHub remote. No API keys, Firebase credentials, passwords, `.env` values, or other secrets are included in this document.
