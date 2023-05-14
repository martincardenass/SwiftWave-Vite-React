//Logic for getting all the items from the database
import {useState, useEffect} from 'react'
import axios from 'axios'

const GetItems = () => {
  const [products, setProducts] = useState([])
  const [sort, setSort] = useState({ sort: 'date', order: 'desc', category: ''}) // default value asc 

  useEffect(() => { // Uses Axios to get the items from dbURL/items (in which they're located
    const getAllItems = async () => {
      //const url = `/items?sortField=${sort.sort}&sortOrder=${sort.order}`
      const url = `/items?sortField=${sort.sort}&sortOrder=${sort.order}&category=${sort.category}`
      console.log(url)
      await axios.get(url)
          .then(response => setProducts(response.data.items))
    }
    getAllItems()
    }, [sort])

    const autoUpdateSort = (newSort) => {
      setSort(newSort)
    }

  const productsArray = products.map(product => ({ //maping and exporting the data on the database so we can use each one indivdually as we need it
    _id: product._id,
    title: product.title,
    price: product.price,
    description: product.description,
    date: product.date,
    category: product.category,
    image: `http://localhost:3001/${product.image}`
  }))

  return { productsArray, autoUpdateSort }
}

export default GetItems
