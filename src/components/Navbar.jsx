import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Vintage Vault</Link>
      <Link to="/cart">My Vault ({cart.length})</Link>
    </nav>
  );
}
