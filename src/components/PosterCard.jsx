import { Link } from 'react-router-dom';
import { IMG_URL, getPrice, getYear } from '../api/tmdb';
import CartButton from './CartButton';

export default function PosterCard({ movie }) {
  return (
    <div className="card">
      <Link to={`/poster/${movie.id}`}>
        <img src={`${IMG_URL}${movie.poster_path}`} alt={`Poster for ${movie.title}`} />
        <h3>{movie.title}</h3>
      </Link>
      <p>
        {getYear(movie.release_date)} · {getPrice(movie.release_date)} kr
      </p>
      <CartButton movie={movie} />
    </div>
  );
}
