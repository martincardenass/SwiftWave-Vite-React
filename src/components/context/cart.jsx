import { createContext, useEffect, useState } from "react";

// export const CartStoredInLocalStorage = JSON.parse(localStorage.getItem('cart')) || []

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(1);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const addToCart = (itemCart) => {
    const itemId = cart.findIndex((item) => item._id === itemCart._id);

    if (itemId !== -1) {
      const newCart = structuredClone(cart);
      newCart[itemId].quantity += Number(count);
      return setCart(newCart);
    }

    setCart((prevState) => [
      ...prevState,
      {
        ...itemCart,
        quantity: Number(count),
      },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    setCart([]);
  };

  const removeFromCart = (_id) => {
    const newCart = cart.filter((obj) => obj._id !== _id);
    setCart(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        count,
        setCount,
        addToCart,
        clearCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
