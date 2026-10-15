import { createContext, useContext } from 'react';

export const CartContext = createContext(null);

// Lets any component read and change the cart: const { cart, addToCart } = useCart();
export function useCart() {
  return useContext(CartContext);
}
