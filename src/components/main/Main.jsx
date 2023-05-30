import React, { useEffect, useState } from "react";
import "./main.css";
import GetItems from "../Items/getItems";
import getItemById from "../Items/getItemById";
import ItemDetails from "./ItemDetails";
import LoadingAnim from "./LoadingAnim";
import PriceFilter from "./PriceFilter";
import ItemCard from "./ItemCard";
import CategoryFilter from "./CategoryFilter";
import CategoryModel from "./CategoryModel";
import SortOptions from "./SortOptions";
import { Link, useParams } from "react-router-dom";
import { useFilter } from "../Items/sorting";

const Main = () => {
  const {
    filter,
    sortField,
    sortOrder,
    sortCategory,
    page,
    minPrice,
    maxPrice,
    handleSortOrderChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleCategoryChange,
    handleSortCategoryAbort,
    limit,
    categoryVisible,
    handlePageChange,
    autoUpdatePageQuery
  } = useFilter();
  const {
    productsArray,
    autoUpdateFilter,
    queryPages,
    queryTotalPages,
    maximumPrice,
    minimumPrice,
  } = GetItems();
  const { item } = getItemById();
  const [categoryText, setCategoryText] = useState("");
  const [price, setPrice] = useState(0);
  const [rightClick, setRightClick] = useState(false);
  const [leftClick, setLeftClick] = useState(false);
  const listItems = [];
  const { id } = useParams();

  useEffect(() => {
    autoUpdateFilter({
      sort: sortField,
      order: sortOrder,
      category: sortCategory,
      page: page,
      limit: limit,
      minprice: minPrice,
      maxprice: maxPrice,
    });
  }, [sortField, sortOrder, sortCategory, page, minPrice, maxPrice]);

  useEffect(() => {
    autoUpdatePageQuery({
      queryTotalPages
    })
  }, [queryTotalPages])

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

  //! if (productsArray.length === 0) { !This is an animation that i should fix.
  // !  return <LoadingAnim />;
  // !}

  if (!id) {
    return { queryTotalPages},(
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
              <PriceFilter
                minPriceChange={handleMinPriceChange}
                maxPriceChange={handleMaxPriceChange}
                price={price}
                maximumPrice={maximumPrice}
                minimumPrice={minimumPrice}
              />
              <CategoryModel
                sortCategory={sortCategory}
                categoryVisible={categoryVisible}
                onCategoryAbort={handleSortCategoryAbort}
              />
              <CategoryFilter onCategoryChange={handleCategoryChange} />
            </div>
            <div className="main-items_items">
              {!queryPages && (
                <div className="main-items">
                  Sorry, but there are no items that match your filter criteria.
                </div>
              )}
              {productsArray.map((product) => (
                <Link key={product._id} to={`items/${product._id}`}>
                  <ItemCard key={product._id} item={product} />
                </Link>
              ))}
            </div>
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
    return <ItemDetails item={item} />;
  }
};

export default Main;
