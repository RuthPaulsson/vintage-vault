import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Vintage <span>Vault</span>
      </Link>
      <Link to="/cart" className="vault-link">
        My Vault <span className="badge">{cart.length}</span>
      </Link>
    </nav>
  );
}
