import { useCart } from '../context/CartContext';
import { getPrice } from '../api/tmdb';

// Add/remove button. I use it on both the poster cards and the detail page.
export default function CartButton({ movie }) {
  const { addToCart, removeFromCart, isInCart } = useCart();

  // If the poster is already in the cart, show a remove button instead
  if (isInCart(movie.id)) {
    return (
      <button className="cart-button remove" onClick={() => removeFromCart(movie.id)}>
        Remove from vault
      </button>
    );
  }

  // I only save the info the cart page needs, not the whole movie object
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
