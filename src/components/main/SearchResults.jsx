import React from "react";
import ItemCard from "./ItemCard";
import "./main.css";
import { Link } from "react-router-dom";
import { useFetchRequest } from "../navbar/GetSearchItems";

const SearchResults = () => {
  const { searchResults, searchResultsTotal } = useFetchRequest();
  return (
    <>
      {!searchResultsTotal && (
        <div className="main-items">
          Sorry, there are no items that match your search criteria.
        </div>
      )}
      <div className="main">
        <div className="main-items">
          <div className="main-items_items">
            {searchResults.map((item) => (
              <Link key={item._id} to={`../items/${item._id}`}>
                <ItemCard key={item._id} item={item} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
