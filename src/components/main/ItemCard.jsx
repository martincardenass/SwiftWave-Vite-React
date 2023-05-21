import React from "react";
import { Link, useNavigate  } from "react-router-dom";
import "./main.css";

const ItemCard = ({ item, onItemClick }) => {

  const handleItemClick = () => {
    onItemClick(item._id);
  }
  return (
    <li onClick={handleItemClick} key={item._id}>
      <img src={item.image} alt={item.title} />
      <h2>{item.title}</h2>
      <p>${item.price}</p>
    </li>
  );
};

export default ItemCard;
