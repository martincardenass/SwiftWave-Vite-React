import { useState } from "react";

export function usePagination() {
  const [page, setPage] = useState(1);
  const [rightClick, setRightClick] = useState(false);
  const [queryTotalPages, setqueryTotalPages] = useState("");
  const [leftClick, setLeftClick] = useState(false);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortCategory, setSortCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [categoryVisible, setCategoryVisible] = useState(false);
  const listItems = [];

  const autoUpdatePageQuery = (newQueryTotalPages) => {
    setqueryTotalPages(newQueryTotalPages.queryTotalPages);
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

  for (let i = 1; i <= queryTotalPages; i++) {
    if (i > 5) {
      //? if es greater than 5. Do not display numbers anymore. Display dots.
      listItems.push(
        <li value="" key={i} className={page >= i ? "selected" : ""}>
          ...
        </li>
      );
      break; //? exit the loop without adding the dots
    } else {
      listItems.push(
        <li
          onClick={handlePageChange}
          value={i}
          key={i}
          className={page === i ? "selected" : ""}
        >
          {i}
        </li>
      );
    }
  }

  const handleSortOrderChange = (sortField, sortOrder) => { //!
    setSortField(sortField);
    setSortOrder(sortOrder);
    setPage(1)
  };

  const handleCategoryChange = (selectedCategory) => { //!
    setCategoryVisible(true);
    setSortCategory(selectedCategory);
    setPage(1)
  };

    const handleSortCategoryAbort = (categoryAbort) => { //!
    setSortCategory(categoryAbort);
    setCategoryVisible(false);
    setPage(1)
  };

  const handleLeftClick = () => {
    setLeftClick(true);
  };

  const handleLeftRelease = () => {
    setLeftClick(false);
  };

  const handleRightClick = () => {
    setRightClick(true);
  };

  const handleRightRelease = () => {
    setRightClick(false);
  };

  return {
    queryTotalPages,
    autoUpdatePageQuery,
    handlePageChange,
    handleLeftClick,
    handleLeftRelease,
    handleRightClick,
    handleRightRelease,
    page,
    listItems,
    leftClick,
    rightClick,
    handleSortOrderChange,
    handleCategoryChange,
    handleSortCategoryAbort,
    sortField,
    sortOrder,
    sortCategory,
    limit,
    categoryVisible
  };
}
