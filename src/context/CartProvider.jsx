import { useEffect, useState } from 'react';
import { CartContext } from './CartContext';

const STORAGE_KEY = 'vintage-vault-cart';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    if (isInCart(item.id)) return; 
    setCart([...cart, item]);
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  function isInCart(id) {
    return cart.some((item) => item.id === id);
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart, total }}>
      {children}
    </CartContext.Provider>
  );
}
