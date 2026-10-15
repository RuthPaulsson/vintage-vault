import { useCart } from '../context/CartContext';
import { getPrice } from '../api/tmdb';

export default function CartButton({ movie }) {
  const { addToCart, removeFromCart, isInCart } = useCart();

  if (isInCart(movie.id)) {
    return (
      <button className="cart-button remove" onClick={() => removeFromCart(movie.id)}>
        Remove from vault
      </button>
    );
  }

  function handleAdd() {
    addToCart({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      price: getPrice(movie.release_date),
    });
  }

  return (
    <button className="cart-button" onClick={handleAdd}>
      Add to vault
    </button>
  );
}
