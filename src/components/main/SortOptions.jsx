import React from "react";

const SortOptions = ({
  sortField,
  sortOrder,
  categoryText,
  onSortChange,
  sortCategory,
  onCategoryAbort,
}) => {
  const handleSortOrderChange = (e) => {
    const value = e.target.value;
    const [sortField, sortOrder] = value.split("|");
    onSortChange(sortField, sortOrder);
  };

  const handleSortCategoryAbort = () => {
    const categoryAbort = "";
    onCategoryAbort(categoryAbort);
  };

  return (
    <div className="sortanddata_container">
      <div className="categorytext">
        {sortCategory && (
          <p>
            Showing only items with category: {sortCategory}.
            <span className="removecategory" onClick={handleSortCategoryAbort}>
              {" "}
              {/* Empty space*/}
              Back to all items
            </span>
          </p>
        )}
      </div>
      <div className="sort">
        <p>Sort items by:</p>
        <select
          value={`${sortField}|${sortOrder}`}
          onChange={handleSortOrderChange}
        >
          <option value="" disabled hidden>
            {categoryText}
          </option>
          <option value="date|desc">Newly added</option>
          <option value="price|asc">Lower price first</option>
          <option value="price|desc">Higher price first</option>
        </select>
      </div>
    </div>
  );
};

export default SortOptions;
