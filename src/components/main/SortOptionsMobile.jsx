import React from "react";

const SortOptionsMobile = ({ onSortChange }) => {
  const handleSortOrderChange = (sortField, sortOrder) => {
    onSortChange(sortField, sortOrder);
  };

  return (
    <div className="navphone_sortoptions">
      <div className="navphone_sortoptions_form">
        <p onClick={() => handleSortOrderChange("date", "desc")}>
          Newly added
        </p>
        <p onClick={() => handleSortOrderChange("price", "asc")}>
          Lower price first
        </p>
        <p onClick={() => handleSortOrderChange("price", "desc")}>
          Higher price first
        </p>
      </div>
    </div>
  );
};

export default SortOptionsMobile;
