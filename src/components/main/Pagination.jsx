import React from "react";

const Pagination = ({
  page,
  onLeftClick,
  onRightClick,
  onLeftClickRelease,
  onRightClickRelease,
  onPageChange,
  listItems
}) => {

  const handlePageChange = (e) => {
    e.preventDefault();
    const selectedInnerText = e.target.innerText;
    const selectedValue = e.target.value
    onPageChange(selectedInnerText, selectedValue);
    
  };

  const handleLeftClick = () => {
    const leftClick = true;
    onLeftClick(leftClick);
  };

  const handleRightClick = () => {
    const rightClick = true;
    onRightClick(rightClick);
  };

  const handleLeftRelease = () => {
    const leftRelease = false;
    onLeftClickRelease(leftRelease);
  };

  const handleRightRelease = () => {
    const rightRelease = false;
    onRightClickRelease(rightRelease);
  };

  return (
    <nav>
      <ul className="pagination">
        <li
          onClick={handlePageChange}
          onMouseDown={handleLeftClick}
          onMouseLeave={handleLeftRelease}
          onMouseUp={handleLeftRelease}
          className={onLeftClick ? "selected" : ""}
        >
          <a href="">«</a>
        </li>
        {listItems}
        <li
          onClick={handlePageChange}
          onMouseDown={handleRightClick}
          onMouseLeave={handleRightRelease}
          onMouseUp={handleRightRelease}
          className={onRightClick ? "selected" : ""}
        >
          <a href="">»</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
