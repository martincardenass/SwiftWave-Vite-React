import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../main/main.css";
import "./popularitems.css";
import axios from "axios";
import ItemCard from "../main/ItemCard";
import ItemDetails from "../main/ItemDetails";
import getItemById from "../Items/getItemById";
import SortOptions from "../main/SortOptions";
import { TbArrowsDownUp } from "react-icons/tb";
import { useFilter } from "../../hooks/filtering";
import { usePagination } from "../../hooks/pagination";
import MiscLoader from "../main/MiscItemsLoader";
import SortOptionsMobile from "../main/SortOptionsMobile";

const PopularItems = () => {
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
    handleSortOrderChange,
  } = usePagination();
  const { filter, autoUpdateFilter } = useFilter();
  const { item } = getItemById();
  const { id } = useParams();
  const [popularItems, setPopularItems] = useState([]);
  const [queryTotalPages, setQueryTotalPages] = useState([]);
  const [toggleSort, setToggleSort] = useState(false);

  useEffect(() => {
    autoUpdateFilter({
      sort: sortField,
      order: sortOrder,
      page: page,
    });
  }, [sortField, sortOrder, page]);

  useEffect(() => {
    autoUpdatePageQuery({
      queryTotalPages,
    });
  }, [queryTotalPages]);

  useEffect(() => {
    const getPopularItems = async () => {
      setPopularItems([]);
      const url = `/items/popular?sortOrder=${filter.order}&sortField=${filter.sort}&page=${filter.page}&limit=24`; //^ sadly, it cannot be in multiple lines.
      await axios.get(url).then((response) => {
        setPopularItems(response.data.items);
        setQueryTotalPages(response.data.queryTotalPages);
      });
    };

    getPopularItems();
  }, [filter]);

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
          image: item.image,
        }))
      : [];
  };

  const myPopularItems = mapPopularItems(popularItems);

  const handleSortChange = () => {
    setToggleSort(!toggleSort);
  };

  if (!id) {
    return (
      <>
        <div className="banner">
          <div className="popular-header">
            <h1>Most popular items</h1>
          </div>
        </div>
        <div className="main">
          <div className="sortoptions">
            <SortOptions
              sortField={sortField}
              sortOrder={sortOrder}
              onSortChange={handleSortOrderChange}
            />
          </div>
          <div className="main-items">
            <div className="navphone">
              <div className="navphone_filterby" onClick={handleSortChange}>
                <TbArrowsDownUp />
                <p>Sort by</p>
              </div>
            </div>
            {toggleSort && (
              <SortOptionsMobile
                sortField={sortField}
                sortOrder={sortOrder}
                onSortChange={handleSortOrderChange}
              />
            )}
            <div className="items_container">
              <div className="main-items_items">
                {myPopularItems.length === 0 ? (
                  <MiscLoader />
                ) : (
                  myPopularItems.map((item) => (
                    <Link key={item._id} to={`${item._id}`}>
                      <ItemCard key={item._id} item={item} />
                    </Link>
                  ))
                )}
              </div>
            </div>
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

export default PopularItems;
