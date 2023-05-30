import { useState } from "react";

export function useFilter() {
  const [queryTotalPages, setqueryTotalPages] = useState('')
  const [filter, setFilter] = useState({
    sort: "date",
    order: "desc",
    category: "",
    limit: "",
    page: "",
    minprice: "",
    maxprice: "0",
  }); //? default values when loading the page
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortCategory, setSortCategory] = useState("");
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [limit, setLimit] = useState("");
  const [categoryVisible, setCategoryVisible] = useState(false);

  const autoUpdateFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const autoUpdatePageQuery = (newQueryTotalPages) => {
    setqueryTotalPages(newQueryTotalPages.queryTotalPages)
  }

  const handleSortOrderChange = (sortField, sortOrder) => {
    setSortField(sortField);
    setSortOrder(sortOrder);
    setPage(1);
  };

  const handleMinPriceChange = (minPriceChange) => {
    setMinPrice(minPriceChange);
  };

  const handleMaxPriceChange = (maxPriceChange) => {
    setMaxPrice(maxPriceChange);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategoryVisible(true);
    setSortCategory(selectedCategory);
    setLimit(5);
    setPage(1);
  };

  const handleSortCategoryAbort = (categoryAbort) => {
    setSortCategory(categoryAbort);
    setCategoryVisible(false);
    setPage(1);
  };

  const handlePageChange = (e) => {
    e.preventDefault();

    let value = e.target.innerText;

    setPage(e.target.value);

    //*if value '«'
    if (value === "«" && page > 1) {
      setPage(page - 1);
    } else if (value === "«" && page === 1) {
      setPage(1);
    }
    //*if value '»'
    if (value === "»" && page <= queryTotalPages - 1) {
      setPage(page + 1);
    }

    if (value === "»" && page === queryTotalPages) {
      setPage(queryTotalPages);
    }
  };

  return {
    filter,
    autoUpdateFilter,
    autoUpdatePageQuery,
    sortField,
    sortOrder,
    sortCategory,
    page,
    minPrice,
    maxPrice,
    handleSortOrderChange,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleCategoryChange,
    handleSortCategoryAbort,
    limit,
    categoryVisible,
    handlePageChange,
  };
}
