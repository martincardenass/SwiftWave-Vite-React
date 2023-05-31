import { useState, useEffect } from "react";

export function useFilter() {
  const [filter, setFilter] = useState({
    sort: "date",
    order: "desc",
    category: "",
    limit: "",
    page: "",
    minprice: "",
    maxprice: "0",
  });
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const autoUpdateFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const handleMinPriceChange = (minPriceChange) => {
    setMinPrice(minPriceChange);
  };

  const handleMaxPriceChange = (maxPriceChange) => {
    setMaxPrice(maxPriceChange);
  };

  return {
    filter,
    autoUpdateFilter,
    minPrice,
    maxPrice,
    handleMinPriceChange,
    handleMaxPriceChange,
  };
}
