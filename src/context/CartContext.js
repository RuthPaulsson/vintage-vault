import { createContext, useContext } from 'react';

// The context that holds the cart so all components can use it
export const CartContext = createContext(null);

// Custom hook so I can write useCart() instead of useContext(CartContext) everywhere
export function useCart() {
  return useContext(CartContext);
}
