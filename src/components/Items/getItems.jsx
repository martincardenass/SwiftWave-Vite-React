//Logic for getting all the items from the database
import {useState, useEffect} from 'react'
import axios from 'axios'

const GetItems = () => {
  const [products, setProducts] = useState([])

  useEffect(() => { // Uses Axios to get the items from dbURL/items (in which they're located
    axios.get('/items')
        .then(response => setProducts(response.data.items)) //then takes that data and saves in 'products')
    }, [])

  const productsArray = products.map(product => ({ //maping and exporting the data on the database so we can use each one indivdually as we need it
    _id: product._id,
    title: product.title,
    price: product.price,
    description: product.description,
    image: `http://localhost:3001/${product.image}`
  }))

  return { productsArray }
}

export default GetItems
