import React, { useEffect, useState } from 'react'
import './main.css'
import GetItems from '../Items/getItems';

const Main = () => {
  const {productsArray, autoUpdateSort} = GetItems();
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [sortCategory, setSortCategory] = useState('')
  
  const handleSortOrderChange = (e) => {
    const splitValue = e.target.value.split('|')
    setSortField(splitValue[0])
    setSortOrder(splitValue[1])
  }

  const handleCategoryChange = (e) => {
    setSortCategory(prev => {
      const categories = prev.split(',') //necesariy if not the old values wont get removed
      const newCategories = categories.filter(category => category !== e.target.value) // category its not equal to targetvalue
      //if the condition is true, the cb returns true (element will be included in the resulting array), if its false, the cb return false (elemento will be excluded from the resulting array)
      if (e.target.checked) { // If input is checked
        newCategories.push(e.target.value)
      }
      return newCategories.join(',')
    })
  }
  

  useEffect(() => {
    autoUpdateSort({ sort: sortField, order: sortOrder, category: `${sortCategory}` })
  }, [sortField, sortOrder, sortCategory])

  return (
    <>
    <div className="main">
      <div className="main-items">
        <div className="main-sidebar">
          <p>Filter by</p>
          <select defaultValue='' onChange={handleSortOrderChange}>
            <option value='date|desc'>Newly added</option>
            <option value='price|asc'>Lower price first</option>
            <option value='price|desc'>Higher price first</option>
          </select>
          <p>Filter by category</p>
          <div className="categories">
          <form onChange={handleCategoryChange}>
            <p><input type="checkbox" name='category' value='Software' />Software</p>
            <p><input type="checkbox" name='category' value='PC Parts and Hardware' />PC Parts and Hardware</p>
            <p><input type="checkbox" name='category' value='Video Games' />Video Games</p>
            <p><input type="checkbox" name='category' value='Cell Phones' />Cell Phones</p>
            <p><input type="checkbox" name='category' value='Television and Video' />Television and Video</p>
          </form>
          </div>
        </div>
        <div className="main-content">
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
    </div>
    </>
  )
}

export default Main