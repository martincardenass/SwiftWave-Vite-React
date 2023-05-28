import React from "react";
import "./main.css";

const ItemCard = ({ item }) => {
  return (
    <li key={item._id}>
      <img src={`http://localhost:3001/${item.image}`}  alt={item.title} />
      <h2>{item.title}</h2>
      <p>${item.price}</p>
    </li>
  );
};

export default ItemCard;
