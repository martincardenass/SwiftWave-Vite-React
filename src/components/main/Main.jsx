import React, { useEffect, useState } from "react";
import "./main.css";
import GetItems from "../Items/getItems";
import getItemById from "../Items/getItemById";
import ItemDetails from "./ItemDetails";
import MyLoader from "./ItemLoader";
import PriceFilter from "./PriceFilter";
import ItemCard from "./ItemCard";
import CategoryFilter from "./CategoryFilter";
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
    handleCategoryChange,
  } = usePagination();
  const {
    filter,
    minPrice,
    maxPrice,
    handleMinPriceChange,
    handleMaxPriceChange,
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

  if (!id) {
    return (
      <>
        <div className="main">
          <div className="main-items">
            <SortOptions
              sortField={sortField}
              sortOrder={sortOrder}
              onSortChange={handleSortOrderChange}
              sortCategory={sortCategory}
              onCategoryAbort={handleSortCategoryAbort}
            />
            <div className="main-teims_content">
              <div className="main-sidebar">
                <PriceFilter
                  minPriceChange={handleMinPriceChange}
                  maxPriceChange={handleMaxPriceChange}
                  price={price}
                  maximumPrice={maximumPrice}
                  minimumPrice={minimumPrice}
                />
                <CategoryFilter onCategoryChange={handleCategoryChange} />
              </div>
              <div className="main-items_items">
                {/* {!queryPages && (
                  <div className="noitems">
                    Sorry, but there are no items that match your filter
                    criteria.
                  </div>
                )} */}
                {productsArray.length === 0 ? (
                  <MyLoader />
                ) : (
                  productsArray.map((product) => (
                    <Link key={product._id} to={`items/${product._id}`}>
                      <ItemCard key={product._id} item={product} />
                    </Link>
                  ))
                )}
              </div>
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
