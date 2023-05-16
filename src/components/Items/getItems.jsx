//Logic for getting all the items from the database
import {useState, useEffect} from 'react'
import axios from 'axios'

const GetItems = () => {
  const [products, setProducts] = useState([])
  const [all, setAll] = useState([])
  const [pages, setPages] = useState('')
  const [totalItems, setTotalItems] = useState('')
  const [queryTotalPages, setQueryTotalPages] = useState('')
  const [sort, setSort] = useState({ sort: 'date', order: 'desc', category: '', limit: '5', page: '1'}) // default values when loading the page
  const controller = new AbortController()

  useEffect(() => {
    const getItemsByPage = async () => {
      setProducts([])
      setPages('')
      setTotalItems('')
      const url = `/items?sortOrder=${sort.order}&sortField=${sort.sort}&limit=${sort.limit}&page=${sort.page}&category=${sort.category}`
      await axios.get(url, {signal: controller.signal})
          .then(response => (setProducts(response.data.items), setPages(response.data.totalPages), setTotalItems(response.data.total), setQueryTotalPages(response.data.queryTotalPages)))
      // console.log(url)
    }

    getItemsByPage()

    return () => { //cleanup
      controller.abort() //If user makes another request before the next one is completed, it gets cancelled
    }

    }, [sort])

    const autoUpdateSort = (newSort) => {
      setSort(newSort)
    }

  useEffect(() => {
    const controller = new AbortController()
    const getAllItems = async () => {
      const url = '/items/all'
      await axios.get(url, {signal: controller.signal})
            .then(response => (setAll(response.data.items)))
    }
    
    getAllItems()

    return () => { // cleanup
      controller.abort()
    }
  }, [])

  const mapItems = (items) => {
    return items.map((item) => ({
      _id: item._id,
      title: item.title,
      price: item.price,
      description: item.description,
      date: item.date,
      category: item.category,
      image: `http://localhost:3001/${item.image}`
    }))
  }

  const productsArray = mapItems(products)
  const allProducts = mapItems(all)
  return { productsArray, autoUpdateSort, pages, totalItems, allProducts, queryTotalPages }
}

export default GetItems
