import React, {useEffect} from "react";
import ItemCard from "./ItemCard";
import SortOptions from "./SortOptions";
import "./main.css";
import { Link } from "react-router-dom";
import { useFetchRequest } from "../navbar/GetSearchItems";
import { usePagination } from "../../hooks/pagination";

const SearchResults = () => {
  const { sortField, sortOrder, handleSortOrderChange } = usePagination();
  const { searchResults, searchResultsTotal, autoUpdateFilter } = useFetchRequest();

  useEffect(() => {
    autoUpdateFilter({
      sort: sortField,
      order: sortOrder,
    });
  }, [sortField, sortOrder]);
  
  return (
    <>
      {!searchResultsTotal && (
        <div className="main-items">
          Sorry, there are no items that match your search criteria.
        </div>
      )}
      <div className="main">
        <SortOptions
          sortField={sortField}
          sortOrder={sortOrder}
          onSortChange={handleSortOrderChange}
        />
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
