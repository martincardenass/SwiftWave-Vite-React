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
import { useFilter } from "../../hooks/filtering";
import { usePagination } from "../../hooks/pagination";

const Main = () => {
  const {
    autoUpdatePageQuery,
    handlePageChange,
    handleLeftClick,
    handleLeftRelease,
    handleRightClick,
    handleRightRelease,
    page,
    listItems,
    leftClick,
    rightClick,
    sortField,
    sortOrder,
    sortCategory,
    handleSortOrderChange,
    handleSortCategoryAbort,
    limit,
    categoryVisible,
  } = usePagination();
  const {
    filter,
    minPrice,
    maxPrice,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleCategoryChange,
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
  const [price, setPrice] = useState(0);
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
      queryTotalPages,
    });
  }, [queryTotalPages]);

  // useEffect(() => {
  //   if (sortField === "price" && sortOrder === "asc") {
  //     setCategoryText("Lower price first");
  //   }
  //   if (sortField === "price" && sortOrder === "desc") {
  //     setCategoryText("Higher price first");
  //   }
  //   if (sortField === "date" && sortOrder === "desc") {
  //     setCategoryText("Newly added");
  //   }
  // }, [sortField, sortOrder]);

  //! if (productsArray.length === 0) { !This is an animation that i should fix.
  // !  return <LoadingAnim />;
  // !}

  if (!id) {
    return (
      { queryTotalPages },
      (
        //?default
        <>
          <div className="main">
            <SortOptions
              sortField={sortField}
              sortOrder={sortOrder}
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
                    Sorry, but there are no items that match your filter
                    criteria.
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
      )
    );
  }

  if (id) {
    return <ItemDetails item={item} />;
  }
};

export default Main;
