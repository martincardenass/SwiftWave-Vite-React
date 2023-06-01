import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cart";

const Cart = () => {
  const { count } = useContext(CartContext);
  const { cart, removeFromCart } = useCart();
  const [qty, setQty] = useState(count);
  const optionsList = [];

  // const totalPrice = cart.reduce((total, item) => total + item.price * qty, 0).toFixed(2);

  if (cart.length === 0) {
    //? if cart is empty
    return (
      <div className="cart">
        <div className="cart-container">
          <h1>Your cart is empty.</h1>
        </div>
      </div>
    );
  }

  {
    cart.forEach((item) => {
      for (let i = 1; i < item.amount + 1; i++) {
        optionsList.push(
          <option value={i} key={`${item._id}-${i}`}>
            {i}
          </option>
        );
      }
    });
  }
  return (
    <>
      <div className="cart">
        <div className="cart-container">
          <div className="cart-container_headers">
            <h1>Your shopping cart</h1>
            <p>Price</p>
            {/* {JSON.stringify(cart, null, 2)} */}
          </div>
          <div className="border" style={{ marginBottom: "20px" }}></div>
          <div className="cart_item">
            <ul>
              {cart.map((item) => (
                <li key={item._id} className="cart_item-content">
                  <Link key={item._id} to={`../items/${item._id}`}>
                    <img
                      src={`http://localhost:3001/${item.image}`}
                      alt={item.title}
                    />
                  </Link>
                  <div className="cart_item-content-text">
                    <Link key={item._id} to={`../items/${item._id}`}>
                      <h2>{item.title}</h2>
                      <p style={{color: "rgba(0,0,0,0.75)"}}>${item.price} per item</p>
                    </Link>
                    <p style={{marginTop: '15px'}}>
                      Quantity:
                      <select
                      style={{marginLeft: '15px'}}
                        onChange={(e) => {
                          item.quantity = e.target.value;
                          setQty(e.target.value);
                        }}
                        value={item.quantity}
                      >
                        {optionsList.slice(0, item.amount)}
                      </select>
                      <span
                        style={{
                          color: "rgba(0,0,0,0.75)",
                          marginLeft: "10px",
                          fontSize: "15px",
                        }}
                      >
                        ({item.amount} in stock)
                      </span>
                    </p>
                    {/* <p
                      className="deleteitem"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Delete item
                    </p> */}
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border"></div>
          <div className="subtotal">
            <div style={{ fontWeight: "bold", marginRight: "10px" }}>
              Subtotal:
            </div>
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </div>
          {/* <button onClick={clearCart}>Clear cart</button> */}
        </div>
      </div>
    </>
  );
};

export default Cart;
