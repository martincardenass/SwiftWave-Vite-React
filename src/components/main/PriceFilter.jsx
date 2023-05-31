import React from "react";
import "./main.css";

const PriceFilter = ({
  maximumPrice,
  minimumPrice,
  minPriceChange,
  maxPriceChange,
}) => {
  const handleMinPriceChange = (e) => {
    const selectedMinPrice = e.target.value;
    minPriceChange(selectedMinPrice);
  };

  const handleMaxPriceChange = (e) => {
    const selectedMaxPrice = e.target.value;
    maxPriceChange(selectedMaxPrice);
  };

  const priceChangeSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <p>Filter by price</p>
      <div className="categories">
        <div className="pricefilter">
          <form onSubmit={priceChangeSubmit}>
            Min:
            <input
              type="number"
              defaultValue={minimumPrice}
              onChange={handleMinPriceChange}
            />
            Max:
            <input
              type="number"
              defaultValue={maximumPrice}
              onChange={handleMaxPriceChange}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default PriceFilter;
