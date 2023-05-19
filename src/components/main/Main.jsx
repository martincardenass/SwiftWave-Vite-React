import React, { useEffect, useState } from "react";
import "./main.css";
import GetItems from "../Items/getItems";
import getItemById from "../Items/getItemById";
import LoadingAnim from "./LoadingAnim";
import ItemCard from "./ItemCard";
import CategoryFilter from "./CategoryFilter";
import CategoryModel from "./CategoryModel";
import SortOptions from "./SortOptions";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { AiFillThunderbolt } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";

const Main = () => {
  const { productsArray, autoUpdateSort, queryPages, queryTotalPages } =
    GetItems();
  const { autoUpdateId, item } = getItemById();
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortCategory, setSortCategory] = useState("");
  const [categoryText, setCategoryText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("");
  const [rightClick, setRightClick] = useState(false);
  const [leftClick, setLeftClick] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [itemId, setItemId] = useState("");
  const [count, setCount] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [likeText, setLikeText] = useState("Like");
  const listItems = [];

  const handleSortOrderChange = (sortField, sortOrder) => {
    setSortField(sortField);
    setSortOrder(sortOrder);
    setPage(1);
  };

  useEffect(() => {
    if (sortField === "price" && sortOrder === "asc") {
      setCategoryText("Lower price first");
    }
    if (sortField === "price" && sortOrder === "desc") {
      setCategoryText("Higher price first");
    }
    if (sortField === "date" && sortOrder === "desc") {
      setCategoryText("Newly added");
    }
  }, [sortField, sortOrder]);

  const handleCategoryChange = (selectedCategory) => {
    //!
    setCategoryVisible(true);
    setSortCategory(selectedCategory);
    setLimit(5);
    setPage(1);
  };

  const handlePageChange = (e) => {
    e.preventDefault();

    let value = e.target.innerText;

    setPage(e.target.value);

    //*if value '«'
    if (value === "«" && page > 1) {
      setPage(page - 1);
    } else if (value === "«" && page === 1) {
      setPage(1);
    }
    //*if value '»'
    if (value === "»" && page <= queryTotalPages - 1) {
      setPage(page + 1);
    }

    if (value === "»" && page === queryTotalPages) {
      setPage(queryTotalPages);
    }
  };

  useEffect(() => {
    autoUpdateSort({
      sort: sortField,
      order: sortOrder,
      category: sortCategory,
      page: page,
      limit: limit,
    });
  }, [sortField, sortOrder, sortCategory, page]);

  useEffect(() => {
    autoUpdateId(itemId);
  }, [itemId]);

  for (let i = 1; i <= queryTotalPages; i++) {
    if (i > 5) {
      //? if es greater than 5. Do not display numbers anymore. Display dots.
      listItems.push(
        <li value="" key={i} className={page >= i ? "selected" : ""}>
          ...
        </li>
      );
      break; //? exit the loop without adding the dots
    } else {
      listItems.push(
        <li
          onClick={handlePageChange}
          value={i}
          key={i}
          className={page === i ? "selected" : ""}
        >
          {i}
        </li>
      );
    }
  }

  const handleSortCategoryAbort = (categoryAbort) => {
    //!
    setSortCategory(categoryAbort);
    setCategoryVisible(false);
    setPage(1);
  };

  const handleLeftClick = () => {
    setLeftClick(true);
  };

  const handleLeftRelease = () => {
    setLeftClick(false);
  };

  const handleRightClick = () => {
    setRightClick(true);
  };

  const handleRightRelease = () => {
    setRightClick(false);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
    setLikeText(isClicked ? ":(" : "Liked!");
  };

  if (productsArray.length === 0) {
    return <LoadingAnim />;
  }

  if (item) {
    //? if item exists, display it
    return (
      <div className="main">
        <div className="item">
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
                  <input maxLength="2" value={count} />
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
                <button>Purchaste now</button>
                <button>Add to cart</button>
              </div>
              <p key={6}>{item.description}</p>
            </div>
            <div className="item_imgandfav" key={item.image}>
              <div className="flex">
                <p
                  onClick={() => {
                    setItemId(""); //? exists the Item Details by setting their object value to an empty string
                  }}
                >
                  Back to all items
                </p>
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
          {/* <div className="descdetails"><p key={3}>{item.description}</p></div> */}
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      //?default
      <>
        <div className="main">
          <SortOptions
            sortField={sortField}
            sortOrder={sortOrder}
            categoryText={categoryText}
            onSortChange={handleSortOrderChange}
          />
          <div className="main-items">
            <div className="main-sidebar">
              <CategoryModel
                sortCategory={sortCategory}
                categoryVisible={categoryVisible}
                onCategoryAbort={handleSortCategoryAbort}
              />
              <CategoryFilter onCategoryChange={handleCategoryChange} />
            </div>
            {productsArray.map((product) => (
              <ItemCard
                key={product._id}
                item={product}
                onItemClick={(itemId) => {
                  setItemId(itemId);
                }}
              />
            ))}
          </div>
          <div className="query">
            <p>Total items: {queryPages}</p>
          </div>
          <nav>
            <ul className="pagination">
              <li
                onClick={handlePageChange}
                onMouseDown={handleLeftClick}
                onMouseLeave={handleLeftRelease}
                onMouseUp={handleLeftRelease}
                className={leftClick ? "selected" : ""}
              >
                <a href="">«</a>
              </li>
              {listItems}
              <li
                onClick={handlePageChange}
                onMouseDown={handleRightClick}
                onMouseLeave={handleRightRelease}
                onMouseUp={handleRightRelease}
                className={rightClick ? "selected" : ""}
              >
                <a href="">»</a>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
};

export default Main;
