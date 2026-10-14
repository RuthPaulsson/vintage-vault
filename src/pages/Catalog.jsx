import { useEffect, useState } from 'react';
import { getVintageMovies, searchMovies, getYear, VINTAGE_CUTOFF } from '../api/tmdb';
import PosterCard from '../components/PosterCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const DECADES = [
  { label: 'All', from: 1920, to: 1999 },
  { label: '50s', from: 1950, to: 1959 },
  { label: '60s', from: 1960, to: 1969 },
  { label: '70s', from: 1970, to: 1979 },
  { label: '80s', from: 1980, to: 1989 },
  { label: '90s', from: 1990, to: 1999 },
];

export default function Catalog() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [decade, setDecade] = useState(DECADES[0]);
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Runs every time the search term or decade changes
  useEffect(() => {
    let ignore = false; // prevents an old, slow response from overwriting a newer one
    const request = searchTerm ? searchMovies(searchTerm) : getVintageMovies(decade.from, decade.to);

    request
      .then((data) => {
        if (ignore) return;
        // Only keep vintage films that have a poster
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

    return () => {
      ignore = true;
    };
  }, [searchTerm, decade]);

  // Show the loader and clear old errors before a new fetch starts
  function startLoading() {
    setLoading(true);
    setError(null);
  }

  function handleSearch(e) {
    e.preventDefault();
    const term = input.trim();
    if (term === searchTerm) return; // same search – nothing new to fetch
    startLoading();
    setSearchTerm(term);
  }

  function handleDecade(selected) {
    if (selected === decade && !searchTerm) return; // already showing this decade
    startLoading();
    setDecade(selected);
    setSearchTerm('');
    setInput('');
  }

  return (
    <section>
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

      {searchTerm && <p>Results for "{searchTerm}"</p>}

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
