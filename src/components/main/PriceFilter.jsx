import React from "react";
import "./main.css";

const PriceFilter = ({
  onPriceChange,
  price,
  maximumPrice,
  minimumPrice,
  onPriceSubmit,
  minPriceChange,
  maxPriceChange
}) => {

    const handleMinPriceChange = (e) => {
        const selectedMinPrice = e.target.value
        minPriceChange(selectedMinPrice)
    }

    const handleMaxPriceChange = (e) => {
        const selectedMaxPrice = e.target.value
        maxPriceChange(selectedMaxPrice)
    }
    // const handlePriceChange = (e) => {
    //   e.preventDefault();
    //   const selectedPrice = e.target.value;
    //   onPriceChange(selectedPrice);
    // };

    // const submitPriceChange = (e) => {
    //   e.preventDefault();
    //   const submittedPrice = price; //? extracting the price
    //   onPriceSubmit(submittedPrice);
    // };

  const priceChangeSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <p>Filter by price</p>
      <div className="categories">
        {/* <div className="pricefilter">
          <form onSubmit={submitPriceChange}>
            <input
              type="range"
              name="price"
              min={minimumPrice}
              max={maximumPrice}
              onChange={handlePriceChange}
            />
            <input type="submit" value="Filter" />
          </form>
          <p>${price}</p>
        </div> */}
        <div className="pricefilter">
          <form onSubmit={priceChangeSubmit}>
            Min:
            <input type="number" defaultValue={minimumPrice} onChange={handleMinPriceChange} />
            Max:
            <input type="number" defaultValue={maximumPrice} onChange={handleMaxPriceChange}/>
            {/* <input type="submit" value="Filter" /> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default PriceFilter;
