import { useEffect, useState } from 'react';
import { CartContext } from './CartContext';

const STORAGE_KEY = 'vintage-vault-cart';

// Gets the saved cart from localStorage, or an empty array if there is none
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

// Wraps the whole app (in main.jsx) and gives every component access to the cart
export default function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  // Save the cart every time it changes, so it's still there after a reload
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    if (isInCart(item.id)) return; // every poster is one of a kind, so you can only add it once
    setCart([...cart, item]);
  }

  function removeFromCart(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  function isInCart(id) {
    return cart.some((item) => item.id === id);
  }

  // Adds up the price of everything in the cart
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart, total }}>
      {children}
    </CartContext.Provider>
  );
}
