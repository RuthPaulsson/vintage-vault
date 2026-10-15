import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovie, getPrice, getYear, IMG_URL } from '../api/tmdb';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import CartButton from '../components/CartButton';

export default function PosterDetail() {
  const { id } = useParams(); // the :id part of the URL, e.g. /poster/238
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    getMovie(id)
      .then((data) => {
        if (!ignore) setMovie(data);
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
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const director = movie.credits.crew.find((person) => person.job === 'Director');
  const cast = movie.credits.cast.slice(0, 4).map((actor) => actor.name);

  return (
    <article className="detail">
      <Link to="/" className="back">← Back to the vault</Link>

      <img src={`${IMG_URL}${movie.poster_path}`} alt={`Poster for ${movie.title}`} />

      <div className="detail-info">
        <h1>
          {movie.title} <span className="year">({getYear(movie.release_date)})</span>
        </h1>
        {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}
        <p>{movie.overview}</p>

        <ul className="facts">
          {director && <li><strong>Director:</strong> {director.name}</li>}
          {cast.length > 0 && <li><strong>Starring:</strong> {cast.join(', ')}</li>}
          <li><strong>Released:</strong> {movie.release_date}</li>
          <li><strong>Runtime:</strong> {movie.runtime} min</li>
          <li><strong>Genre:</strong> {movie.genres.map((g) => g.name).join(', ')}</li>
          <li><strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10</li>
        </ul>

        <p className="price">{getPrice(movie.release_date)} kr</p>
        <CartButton movie={movie} />
      </div>
    </article>
  );
}
