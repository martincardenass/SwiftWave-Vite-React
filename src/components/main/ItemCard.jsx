import React from "react";
import "./main.css";

const ItemCard = ({ item, onItemClick }) => {
  return (
    <li
      onClick={() => {
        onItemClick(item._id);
      }}
      key={item._id}
    >
      <img src={item.image} alt={item.title} />
      <h2>{item.title}</h2>
      <p>${item.price}</p>
    </li>
  );
};

export default ItemCard;
