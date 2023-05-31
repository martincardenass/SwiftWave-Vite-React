import React from "react";

const CategoryFilter = ({ onCategoryChange }) => {
  const handleCategoryChange = (e) => {
    const SelectedCategory = e.target.value;
    onCategoryChange(SelectedCategory);
  };

  return (
    <>
      <p>Filter by category</p>
      <div className="categories">
        <form onChange={handleCategoryChange}>
          <p>
            <label>
              Software
              <input type="radio" name="category" value="Software" hidden />
            </label>
          </p>
          <p>
            <label>
              PC Parts and Hardware
              <input
                type="radio"
                name="category"
                value="PC Parts and Hardware"
                hidden
              />
            </label>
          </p>
          <p>
            <label>
              Games
              <input type="radio" name="category" value="Video Games" hidden />
            </label>
          </p>
          <p>
            <label>
              Video Game Consoles
              <input
                type="radio"
                name="category"
                value="Video Game Consoles"
                hidden
              />
            </label>
          </p>
          <p>
            <label>
              Cell Phones
              <input type="radio" name="category" value="Cell Phones" hidden />
            </label>
          </p>
          <p>
            <label>
              Television and Video
              <input
                type="radio"
                name="category"
                value="Television and Video"
                hidden
              />
            </label>
          </p>
        </form>
      </div>
    </>
  );
};

export default CategoryFilter;
