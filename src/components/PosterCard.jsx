import { Link } from 'react-router-dom';
import { IMG_URL, getPrice, getYear } from '../api/tmdb';
import CartButton from './CartButton';

// One poster in the catalog grid
export default function PosterCard({ movie }) {
  return (
    <div className="card">
      {/* Clicking the image or title opens the detail page */}
      <Link to={`/poster/${movie.id}`}>
        <img src={`${IMG_URL}${movie.poster_path}`} alt={`Poster for ${movie.title}`} />
        <h3>{movie.title}</h3>
      </Link>
      <p>
        {getYear(movie.release_date)} · {getPrice(movie.release_date)} kr
      </p>
      {/* The button is outside the Link, otherwise clicking it would also open the detail page */}
      <CartButton movie={movie} />
    </div>
  );
}
