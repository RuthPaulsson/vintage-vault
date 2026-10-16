// All calls to the TMDb API are in this file

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_KEY; // the key is in .env so it's not on GitHub
export const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// Only movies from before 2000 count as vintage in my shop
export const VINTAGE_CUTOFF = 2000;

// Helper that all the other functions use.
// Adds the API key to the URL and throws an error if the request fails.
async function get(path, params = {}) {
  const query = new URLSearchParams({ api_key: API_KEY, language: 'en-US', ...params });
  const res = await fetch(`${BASE_URL}${path}?${query}`);
  if (!res.ok) throw new Error(`Could not fetch data (status ${res.status})`);
  return res.json();
}

// Gets movies between two years, sorted by most votes so famous movies come first
export function getVintageMovies(from, to) {
  return get('/discover/movie', {
    sort_by: 'vote_count.desc',
    include_adult: false,
    'primary_release_date.gte': `${from}-01-01`,
    'primary_release_date.lte': `${to}-12-31`,
  });
}

export function searchMovies(searchTerm) {
  return get('/search/movie', { query: searchTerm });
}

// Gets one movie. append_to_response gives me the actors and director in the same request.
export function getMovie(id) {
  return get(`/movie/${id}`, { append_to_response: 'credits' });
}

// "1972-03-14" -> 1972
export function getYear(releaseDate) {
  return parseInt(releaseDate?.slice(0, 4)) || null;
}

// My own pricing: 149 kr + 5 kr for every year before 2000, so older posters cost more
export function getPrice(releaseDate) {
  const year = getYear(releaseDate) ?? VINTAGE_CUTOFF;
  return Math.max(149, 149 + (VINTAGE_CUTOFF - year) * 5);
}
