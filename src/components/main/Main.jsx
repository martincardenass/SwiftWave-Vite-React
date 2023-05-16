import React, { useEffect, useState } from 'react'
import './main.css'
import GetItems from '../Items/getItems';

const Main = () => {
  const {productsArray, autoUpdateSort, pages, queryTotalPages} = GetItems()
  const [sortField, setSortField] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [sortCategory, setSortCategory] = useState('')
  const [categoryText, setCategoryText] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState('')
  const [rightClick, setRightClick] = useState(false)
  const [leftClick, setLeftClick] = useState(false)
  const listItems = []
  
  const handleSortOrderChange = (e) => {
    const splitValue = e.target.value.split('|')
    setSortField(splitValue[0])
    setSortOrder(splitValue[1])
    setPage(1)
  }

  useEffect(() => {
    if(sortField === 'price' && sortOrder === 'asc') {
      setCategoryText('Lower price first')
    }
    if(sortField === 'price' && sortOrder === 'desc') {
      setCategoryText('Higher price first')
    }
    if(sortField === 'date' && sortOrder === 'desc') {
      setCategoryText('Newly added')
    }
  }, [sortField, sortOrder])

  const handleCategoryChange = (e) => {
    // setSortCategory(prev => {
    //   const categories = prev.split('') //necesariy if not the old values wont get removed
    //   const newCategories = categories.filter(category => category !== e.target.value) // category its not equal to targetvalue
    //   //if the condition is true, the cb returns true (element will be included in the resulting array), if its false, the cb return false (elemento will be excluded from the resulting array)
    //   if (e.target.checked) { // If input is checked
    //     newCategories.push(e.target.value)
    //   } else {
    //     setPage(e.target.value) < DEPRECATED CODE I USED FOR MULTIPLE CATEGIRUES AT A TIME SEPARATED WITH COMMAS ','
    //   }

    //   const newSort = newCategories.join(',')
    //   if(newSort === '') {
    //     setLimit(5)
    //   }
    //   return newCategories.join(',')
    // })
    setSortCategory(e.target.value)
    setLimit(5)
    setPage(1)
  }

  const handlePageChange = (e) => {
    e.preventDefault()

    let value = e.target.innerText

    setPage(e.target.value)

    //if value '«'
    if (value === '«' && page > 1) {
      setPage(page - 1)
    } else if (value === '«' && page === 1) {
      setPage(1)
    }
    //if value '»'
    if (value === '»' && page <= queryTotalPages-1) {
      setPage(page + 1)
    }

    if(value === '»' && page === queryTotalPages) {
      setPage(queryTotalPages)
    }
  }

  useEffect(() => {
    autoUpdateSort({ sort: sortField, order: sortOrder, category: sortCategory, page: page, limit: limit })
  }, [sortField, sortOrder, sortCategory, page])

  for(let i =1; i <= queryTotalPages; i++) {
    if(i > 5) { // if es greater than 5. Do not display numbers anymore. Display dots.
      listItems.push(<li value='' key={i} className={page >= i ? 'selected' : ''}>...</li>)
      break // exit the loop without adding the dots
    } else {  
      listItems.push(<li onClick={handlePageChange} value={i} key={i} className={page === i ? 'selected' : ''} >{i}</li>)
    }
  }


  
  if (productsArray.length === 0) {
    return (
    <div className='main'>
      <div className="main_content">
        <div className="loading">
          <div className='dot-flashing'></div>
        </div>
      </div>
  </div>
    )
  }

  const handleLeftClick = () => {
    setLeftClick(true)
  }

  const handleLeftRelease = () => {
    setLeftClick(false)
  }

  const handleRightClick = () => {
    setRightClick(true)
  }

  const handleRightRelease = () => {
    setRightClick(false)
  }

  return (
    <>
    <div className="main">
      <div className="sort">
        <p>Sort items by:</p>
        <select onChange={handleSortOrderChange}>
          <option value="" disabled selected hidden>{categoryText}</option>
          <option value='date|desc'>Newly added</option>
          <option value='price|asc'>Lower price first</option>
          <option value='price|desc'>Higher price first</option>
        </select>
      </div>
      <div className="main-items">
        <div className="main-sidebar">
          {/* <div className="category">
            {sortCategory}
          </div> */}
          <p>Filter by category</p>
          <div className="categories">
          <form onChange={handleCategoryChange}>
            <p><label>Software<input type="radio" name='category' value='Software' hidden /></label></p>
            <p><label>PC Parts and Hardware<input type="radio" name='category' value='PC Parts and Hardware' hidden /></label></p>
            <p><label>Video Games<input type="radio" name='category' value='Video Games' hidden /></label></p>
            <p><label>Cell Phones<input type="radio" name='category' value='Cell Phones' hidden /></label></p>
            <p><label>Television and Video<input type="radio" name='category' value='Television and Video' hidden /></label></p>
          </form>
          </div>
        </div>
        <div className="main_content">
        <ul>
          {productsArray.map(product => (
            <li key={product._id}>
              <img src={product.image} alt={product.title}/>
              <h2>{product.title}</h2>
              <p>${product.price}</p>
              <p>{product.date}</p>
              <p>{product.category}</p>
            </li>
            ))}
        </ul>
        </div>
      </div>
      <nav>
        <ul className='pagination'>
          <li onClick={handlePageChange}  onMouseDown={handleLeftClick} onMouseLeave={handleLeftRelease} onMouseUp={handleLeftRelease} className={leftClick ? 'selected' : ''}><a href="">«</a></li>
          {listItems}
          <li onClick={handlePageChange}  onMouseDown={handleRightClick} onMouseLeave={handleRightRelease} onMouseUp={handleRightRelease} className={rightClick ? 'selected' : ''}><a href="">»</a></li>
        </ul>
      </nav>
    </div>
    </>
  )
}

export default Main