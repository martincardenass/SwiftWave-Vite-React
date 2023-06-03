import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
import SortOptions from "./SortOptions";
import "./main.css";
import { Link, useNavigate } from "react-router-dom";
import { useFetchRequest } from "../navbar/GetSearchItems";
import { usePagination } from "../../hooks/pagination";
import { TbArrowsDownUp } from "react-icons/tb";
import MiscLoader from "./MiscItemsLoader";
import SortOptionsMobile from "../main/SortOptionsMobile";

const SearchResults = () => {
  const [toggleSort, setToggleSort] = useState(false);
  const { sortField, sortOrder, handleSortOrderChange } = usePagination();
  const navigate = useNavigate();
  const { searchResults, searchResultsTotal, autoUpdateFilter } =
    useFetchRequest();

  useEffect(() => {
    autoUpdateFilter({
      sort: sortField,
      order: sortOrder,
    });
  }, [sortField, sortOrder]);

  setTimeout(() => {
    if (searchResultsTotal === 0) {
      navigate("*");
    }
  }, 1000);

  const handleSortChange = () => {
    setToggleSort(!toggleSort);
  };
  return (
    <>
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
              {searchResults.length === 0 ? (
                <MiscLoader />
              ) : (
                searchResults.map((item) => (
                  <Link key={item._id} to={`../items/${item._id}`}>
                    <ItemCard key={item._id} item={item} />
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
