const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_KEY;
export const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// The vault only sells posters from films released before this year
export const VINTAGE_CUTOFF = 2000;

async function get(path, params = {}) {
  const query = new URLSearchParams({ api_key: API_KEY, language: 'en-US', ...params });
  const res = await fetch(`${BASE_URL}${path}?${query}`);
  if (!res.ok) throw new Error(`Could not fetch data (status ${res.status})`);
  return res.json();
}

export function getVintageMovies(from, to) {
  return get('/discover/movie', {
    sort_by: 'vote_count.desc', // most voted = well-known classics first
    include_adult: false,
    'primary_release_date.gte': `${from}-01-01`,
    'primary_release_date.lte': `${to}-12-31`,
  });
}

export function searchMovies(searchTerm) {
  return get('/search/movie', { query: searchTerm });
}

// Fetches one film, including cast and crew, in a single request
export function getMovie(id) {
  return get(`/movie/${id}`, { append_to_response: 'credits' });
}

export function getYear(releaseDate) {
  return parseInt(releaseDate?.slice(0, 4)) || null;
}

// The older the film, the more valuable the poster
export function getPrice(releaseDate) {
  const year = getYear(releaseDate) ?? VINTAGE_CUTOFF;
  return Math.max(149, 149 + (VINTAGE_CUTOFF - year) * 5);
}
