import { useEffect, useState } from 'react';
import { getVintageMovies, searchMovies, getYear, VINTAGE_CUTOFF } from '../api/tmdb';
import PosterCard from '../components/PosterCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

// The decade filter buttons
const DECADES = [
  { label: 'All', from: 1920, to: 1999 },
  { label: '50s', from: 1950, to: 1959 },
  { label: '60s', from: 1960, to: 1969 },
  { label: '70s', from: 1970, to: 1979 },
  { label: '80s', from: 1980, to: 1989 },
  { label: '90s', from: 1990, to: 1999 },
];

// Start page with all posters, search and filter
export default function Catalog() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [decade, setDecade] = useState(DECADES[0]);
  const [input, setInput] = useState(''); // what's typed in the search field
  const [searchTerm, setSearchTerm] = useState(''); // what we actually search for (set when the form is submitted)

  // Fetch movies when the search term or decade changes
  useEffect(() => {
    // If the user clicks fast, an old request can finish after a new one.
    // ignore makes sure only the latest result is shown.
    let ignore = false;

    // Search if there is a search term, otherwise show the selected decade
    const request = searchTerm ? searchMovies(searchTerm) : getVintageMovies(decade.from, decade.to);

    request
      .then((data) => {
        if (ignore) return;
        // Remove movies without a poster, and newer movies from the search results
        const vintage = data.results.filter(
          (movie) => movie.poster_path && getYear(movie.release_date) < VINTAGE_CUTOFF
        );
        setMovies(vintage);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    // Cleanup: runs before the next fetch starts
    return () => {
      ignore = true;
    };
  }, [searchTerm, decade]);

  // Shows the loader and clears old errors before a new fetch
  function startLoading() {
    setLoading(true);
    setError(null);
  }

  function handleSearch(e) {
    e.preventDefault(); // stops the page from reloading
    const term = input.trim();
    if (term === searchTerm) return; // same search as before, nothing to do
    startLoading();
    setSearchTerm(term);
  }

  function handleDecade(selected) {
    if (selected === decade && !searchTerm) return; // already showing this decade
    startLoading();
    setDecade(selected);
    // Clear the search so the decade is shown
    setSearchTerm('');
    setInput('');
  }

  return (
    <section>
      <header className="hero">
        <p className="hero-eyebrow">Est. 1920 · Original film posters</p>
        <h1>Classic cinema, framed forever</h1>
      </header>

      <form onSubmit={handleSearch} className="search">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for a classic film…"
        />
        <button type="submit">Search</button>
      </form>

      <div className="filters">
        {DECADES.map((d) => (
          <button
            key={d.label}
            className={d === decade && !searchTerm ? 'active' : ''}
            onClick={() => handleDecade(d)}
          >
            {d.label}
          </button>
        ))}
      </div>

      {searchTerm && <p className="results-for">Results for "{searchTerm}"</p>}

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && movies.length === 0 && (
        <p>No vintage posters found. Try another search.</p>
      )}
      {!loading && !error && (
        <div className="grid">
          {movies.map((movie) => (
            <PosterCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
