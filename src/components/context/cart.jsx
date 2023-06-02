import { createContext, useEffect, useState } from "react";
import { useUserCart } from "../../hooks/getUserCart";
import axios from "axios";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { userCart } = useUserCart();
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(1);
  const storedUserId = JSON.parse(localStorage.getItem("userId"));

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Load cart from the user, if logged
  useEffect(() => {
    if (storedUserId) {
      setCart(userCart);
    }
  }, [userCart]);

  const addToCart = (itemCart) => {
    if (!storedUserId) {
      // if no user is logged
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
    }

    //if user is logged
    if (storedUserId) {
      const patchCart = async () => {
        const url = `/api/postcart`;

        const updatedCart = [...cart, { ...itemCart, quantity: Number(count) }];
        const cartItem = {
          id: storedUserId,
          cart: updatedCart,
        };
        await axios.patch(url, cartItem);
        setCart(updatedCart);
      };

      patchCart();
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    setCart([]);
  };

  const removeFromCart = (_id) => {
    if (!storedUserId) {
      // if no user is logged.
      const newCart = cart.filter((obj) => obj._id !== _id);
      setCart(newCart);
    }

    if (storedUserId) {
      const newCart = async () => {
        const url = `/api/postcart`;
        const newCart = cart.filter((obj) => obj._id !== _id);
        const cartItem = {
          id: storedUserId,
          cart: newCart,
        };

        await axios.patch(url, cartItem);
        setCart(newCart);
      };
      newCart();
    }
  };

  const changeQuantity = (_id, quantity, selectedQty) => {
    const patchCartQuantity = async () => {
      const url = `/api/postcart`;

      const itemIndex = cart.findIndex((obj) => obj._id === _id);
      const newCart = [...cart];
      newCart[itemIndex].quantity = Number(selectedQty);

      const cartItem = {
        id: storedUserId,
        cart: newCart,
      };
      await axios.patch(url, cartItem);
      // setCart(updatedCart)
    };
    patchCartQuantity();
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
        changeQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
