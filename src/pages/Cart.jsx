import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IMG_URL, getYear } from '../api/tmdb';

// The cart page ("My Vault")
export default function Cart() {
  const { cart, removeFromCart, total } = useCart();

  if (cart.length === 0) {
    return (
      <section className="cart">
        <h1>My Vault</h1>
        <p>Your vault is empty. <Link to="/">Find some treasures!</Link></p>
      </section>
    );
  }

  return (
    <section className="cart">
      <h1>My Vault</h1>

      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <Link to={`/poster/${item.id}`}>
              <img src={`${IMG_URL}${item.poster_path}`} alt={`Poster for ${item.title}`} />
            </Link>
            <div className="cart-item-info">
              <Link to={`/poster/${item.id}`}>{item.title}</Link>
              <span>{getYear(item.release_date)}</span>
            </div>
            <span className="cart-item-price">{item.price} kr</span>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* "1 poster" or "2 posters" */}
      <p className="cart-total">
        Total ({cart.length} {cart.length === 1 ? 'poster' : 'posters'}): <strong>{total} kr</strong>
      </p>
    </section>
  );
}
