import React, { useEffect, useState } from "react";
import "./main.css";
import GetItems from "../Items/getItems";
import getItemById from "../Items/getItemById";
import ItemDetails from "./ItemDetails";
import LoadingAnim from "./LoadingAnim";
import ItemCard from "./ItemCard";
import CategoryFilter from "./CategoryFilter";
import CategoryModel from "./CategoryModel";
import SortOptions from "./SortOptions";
import { Link, useLocation, useParams } from "react-router-dom";

const Main = () => {
  const { productsArray, autoUpdateSort, queryPages, queryTotalPages } =
    GetItems();
  const { item } = getItemById();
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortCategory, setSortCategory] = useState("");
  const [categoryText, setCategoryText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("");
  const [rightClick, setRightClick] = useState(false);
  const [leftClick, setLeftClick] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const listItems = [];
  const { id } = useParams()
  const location = useLocation()

  useEffect(() => {
    autoUpdateSort({
      sort: sortField,
      order: sortOrder,
      category: sortCategory,
      page: page,
      limit: limit,
    });
  }, [sortField, sortOrder, sortCategory, page]);

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

  if (productsArray.length === 0) {
    return <LoadingAnim />;
  }

  if (!id) {
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
              <Link key={product._id} to={`items/${product._id}`}>
                <ItemCard key={product._id} item={product} />
              </Link>
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

  if (id) {
    return <ItemDetails item={item}/>;
  }
};

export default Main;
