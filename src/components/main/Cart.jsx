import React, { useState } from "react";
import "./cart.css";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const [qty, setQty] = useState();
  const optionsList = [];

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  if (cart.length === 0) {
    //? if cart is empty
    return (
      <div className="cart">
        <div className="cart-container">
          <h1>Your cart is empty.</h1>
          {/* <h2>Start shopping.</h2> */}
        </div>
      </div>
    );
  }

  {
    cart.forEach((item) => {
      for (let i = 0; i < item.amount; i++) {
        optionsList.push(
          <option value={i} key={i}>
            {i}
          </option>
        );
      }
    });
  }

  const handleQtyChange = (e) => {
    setQty(e.target.value);
  };

  return (
    <>
      <div className="cart">
        <div className="cart-container">
          <div className="cart-container_headers">
            <h1>Your shopping cart</h1>
            <p>Price</p>
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
                    </Link>
                    <p>
                      Quantity:
                      <select onChange={handleQtyChange}>
                        {optionsList.slice(1, 11)}
                      </select>
                      <span
                        style={{
                          color: "rgba(0,0,0,0.75)",
                          marginLeft: "10px",
                        }}
                      >
                        ({item.amount} in stock)
                      </span>
                    </p>
                    <p
                      className="deleteitem"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Delete item
                    </p>
                  </div>
                  <p>${item.price}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="border"></div>
          <p className="subtotal">
            <div style={{ fontWeight: "bold", marginRight: "10px" }}>
              Subtotal:
            </div>
            ${totalPrice}
          </p>
          {/* <button onClick={clearCart}>Clear cart</button> */}
        </div>
      </div>
    </>
  );
};

export default Cart;
