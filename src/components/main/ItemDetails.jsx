import React, { useContext, useEffect, useState } from "react";
import "./main.css";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { AiFillThunderbolt } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import DetailsLoader from "./ItemDetailsLoader";
import { CartContext } from "../context/cart";

const ItemDetails = ({ item }) => {
  const { addToCart, cart, clearCart } = useCart();
  const { count, setCount } = useContext(CartContext);
  const [isClicked, setIsClicked] = useState(false);
  const [likeText, setLikeText] = useState("Like");
  const navigate = useNavigate();

  const handleClick = () => {
    setIsClicked(!isClicked);
    setLikeText(isClicked ? ":(" : "Liked!");
  };

  const handleReturn = () => {
    navigate("/");
  };

  useEffect(() => {
    setCount(1)
  }, [])

  return (
    <>
      <div className="main">
        <div className="item">
          {Object.keys(item).length === 0 ? (
            <DetailsLoader />
          ) : (
            <div className="item_details">
              <div className="item_details-cnt">
                <div className="item_category">
                  <p style={{ display: "flex", alignItems: "center" }} key={4}>
                    All items <MdKeyboardArrowRight />{" "}
                    <span>{item.category}</span>
                  </p>
                </div>
                <div className="item_text">
                  <h1 key={1}>{item.title}</h1>
                  <h3 key={2}>${item.price}</h3>
                </div>
                <div className="item-quantitytext">
                  <p>Qty:</p>
                  <div className="item_quantity">
                    <button
                      onClick={() =>
                        setCount((count) => (count > 1 ? count - 1 : 1))
                      }
                    >
                      -
                    </button>
                    <input maxLength="2" value={count} readOnly={true} />
                    <button
                      onClick={() =>
                        setCount((count) =>
                          count < item.amount ? count + 1 : item.amount
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p key={5}>{item.amount || "undefined"} in stock</p>
                </div>
                <div className="item_btns">
                  <button className="button1">Purchase now</button>
                  <Link to="/cart">
                    <button
                      className="button2"
                      onClick={() => addToCart(item, count)}
                    >
                      Add to cart
                    </button>
                  </Link>
                </div>
                <p key={6}>{item.description}</p>
              </div>
              <div className="item_imgandfav" key={item.image}>
                <div className="flex">
                  <p onClick={handleReturn}>Back to all items</p>
                  <MdKeyboardArrowRight />
                </div>
                <img
                  src={`http://localhost:3001/${item.image}`}
                  alt="Product Image"
                />
                <div className="item_iconscontainer">
                  {item.isPopular === true ? (
                    <div className="item_imgandfav-thunder">
                      <AiFillThunderbolt />
                      <p>Popular item</p>
                    </div>
                  ) : null}
                  <div className="item_imgandfav-fav">
                    {isClicked ? (
                      <IoHeartSharp
                        style={{ cursor: "pointer" }}
                        onClick={handleClick}
                      />
                    ) : (
                      <IoHeartOutline
                        style={{ cursor: "pointer" }}
                        onClick={handleClick}
                      />
                    )}
                    <p onClick={handleClick}>{likeText}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
