import React from "react";
import "./cart.css";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) { //? if cart is empty
    return (
      <div className="cart">
        <div className="cart-container">
          <h1>Your cart is empty.</h1>
          {/* <h2>Start shopping.</h2> */}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="cart">
        <div className="cart-container">
          <h1>Your shopping cart</h1>
          <div className="cart_item">
            <ul>
              {cart.map((item) => (
                <li key={item._id} className="cart_item-content">
                  <img
                    src={`http://localhost:3001/${item.image}`}
                    alt={item.title}
                  />
                  <div className="cart_item-content-text">
                    <Link key={item._id} to={`../items/${item._id}`}>
                      <h2>{item.title}</h2>
                    </Link>
                    <p>${item.price}</p>
                    <p>Qty: {item.quantity}</p>
                    <p className="deleteitem" onClick={() => removeFromCart(item._id)}>Delete item</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* <button onClick={clearCart}>Clear cart</button> */}
        </div>
      </div>
    </>
  );
};

export default Cart;
