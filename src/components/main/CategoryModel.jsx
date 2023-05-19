import React from "react";
import { RiCloseLine } from "react-icons/ri";
import "./main.css";

const CategoryModel = ({ sortCategory, categoryVisible, onCategoryAbort }) => {
    const handleSortCategoryAbort = () => {
        const categoryAbort = ''
        onCategoryAbort(categoryAbort)
    }
  return (
    <div className={categoryVisible ? "category" : "hidden"}>
      {sortCategory}
      <div className="icon">
        <RiCloseLine onClick={handleSortCategoryAbort} />
      </div>
    </div>
  );
};

export default CategoryModel;
