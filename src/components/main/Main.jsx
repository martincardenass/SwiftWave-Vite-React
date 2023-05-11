import React from 'react'
import './main.css'
import GetItems from '../Items/getItems';

const Main = () => {
  const {productsArray} = GetItems();

  return (
    <>
    <div className="sort">
      <select>
        <option>Newly added</option>
        <option>Lower price first</option>
        <option>Higher price first</option>
      </select>
    </div>
    <div className="main">
      <div className="main-items">
        <ul>
          {productsArray.map(product => (
            <li key={product._id}>
              <img src={product.image} alt={product.title}/>
              <h2>{product.title}</h2>
              <p>${product.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default Main