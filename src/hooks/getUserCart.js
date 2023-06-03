import axios from "axios";
import { useEffect, useState } from "react";

export const useUserCart = () => {
  const [userCart, setUserCart] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const storedUserId = JSON.parse(localStorage.getItem("userId"));
    const fetchCart = async () => {
      const url = `/api/cart/${storedUserId}`;
      await axios.get(url).then((response) => {
        setUserCart(response.data.cart);
      });
    };

    fetchCart();

    return () => {
      controller.abort();
    };
  }, []);
  return {
    userCart,
  };
};
