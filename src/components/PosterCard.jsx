import { Link } from 'react-router-dom';
import { IMG_URL, getPrice, getYear } from '../api/tmdb';

export default function PosterCard({ movie }) {
  return (
    <Link to={`/poster/${movie.id}`} className="card">
      <img src={`${IMG_URL}${movie.poster_path}`} alt={`Poster for ${movie.title}`} />
      <h3>{movie.title}</h3>
      <p>
        {getYear(movie.release_date)} · {getPrice(movie.release_date)} kr
      </p>
    </Link>
  );
}
