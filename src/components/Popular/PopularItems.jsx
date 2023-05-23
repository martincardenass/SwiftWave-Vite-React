import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../main/main.css";
import axios from "axios";
import ItemCard from "../main/ItemCard";
import ItemDetails from "../main/ItemDetails";
import getItemById from "../Items/getItemById";

const PopularItems = () => {
  const [popularItems, setPopularItems] = useState([]);
  const { item } = getItemById();
  const { id } = useParams();

  useEffect(() => {
    const getPopularItems = async () => {
      setPopularItems([]);
      const url = "/items/popular";
      await axios.get(url).then((response) => {
        setPopularItems(response.data.items);
      });
    };

    getPopularItems();
  }, []);

  const mapPopularItems = (items) => {
    return Array.isArray(items)
      ? items.map((item) => ({
          _id: item._id,
          title: item.title,
          price: item.price,
          description: item.description,
          date: item.date,
          category: item.category,
          amount: item.amount,
          isPopular: item.isPopular,
          image: `http://localhost:3001/${item.image}`,
        }))
      : [];
  };

  const myPopularItems = mapPopularItems(popularItems);

  if (!id) { return (
    <>
      <div className="main-items">
        <div className="main-items_items">
          {myPopularItems.map((item) => (
            <Link key={item._id} to={`${item._id}`}>
              <ItemCard key={item._id} item={item} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );}

  if (id) {
    return <ItemDetails item={item} />;
  }
};

export default PopularItems;
