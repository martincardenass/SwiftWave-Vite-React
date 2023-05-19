import React from "react";

const SortOptions = ({ sortField, sortOrder, categoryText, onSortChange }) => {
  const handleSortOrderChange = (e) => {
    const value = e.target.value;
    const [sortField, sortOrder] = value.split("|");
    onSortChange(sortField, sortOrder);
  };

  return (
    <>
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
    </>
  );
};

export default SortOptions;
