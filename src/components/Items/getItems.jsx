//Logic for getting all the items from the database
import {useState, useEffect} from 'react'
import axios from 'axios'

// git changes: added query pages, and set query pages to determine in the front how many items are in the selected query. IE: how many items in the selected category
const GetItems = () => {
  const [products, setProducts] = useState([])
  const [all, setAll] = useState([])
  const [pages, setPages] = useState('')
  const [queryPages, setQueryPages] = useState('')
  const [totalItems, setTotalItems] = useState('')
  const [queryTotalPages, setQueryTotalPages] = useState('')
  const [sort, setSort] = useState({ sort: 'date', order: 'desc', category: '', limit: '5', page: '1'}) // default values when loading the page
  // const [searchId, setSearchId] = useState('')
  // const [itemId, setItemId] = useState([]) // array for each individual item ID
  const controller = new AbortController()

  useEffect(() => { // ITEMS DIVIDED BY PAGE
    const getItemsByPage = async () => {
      setProducts([])
      setPages('')
      setTotalItems('')
      const url = `/items?sortOrder=${sort.order}&sortField=${sort.sort}&limit=${sort.limit}&page=${sort.page}&category=${sort.category}`
      await axios.get(url, {signal: controller.signal})
          .then(response => (
            setProducts(response.data.items),
            setPages(response.data.totalPages),
            setQueryPages(response.data.queryTotal),
            setTotalItems(response.data.total),
            setQueryTotalPages(response.data.queryTotalPages)
          ))
    }

    getItemsByPage()

    return () => { //cleanup
      controller.abort() //If user makes another request before the next one is completed, it gets cancelled
    }

    }, [sort])

    const autoUpdateSort = (newSort) => {
      setSort(newSort)
    }

    // const autoUpdateId = (newSearchId) => {
    //   setSearchId(newSearchId)
    // }

  useEffect(() => { // GETS ALL THE ITEMS
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

  // useEffect(() => { // GETS THE REQUESTED ITEM
  //   const controller = new AbortController() // necessary for cleanup
  //   const getItemById = async () => {
  //     // setItemId([])
  //     const url = `/items/${searchId.id}`
  //     // const url = '/items/646230f5e19c41b05d6f7841'
  //     await axios.get(url, {signal: controller.signal})
  //           .then(response => (setItemId(response.data.item)))
  //   }
  //   getItemById()
    
  //   return () => { //cleanup
  //     controller.abort()
  //   }
  // }, [searchId])

  const mapItems = (items) => { //mapping the items to use outside of the component
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

  // const mappedItemId = itemId
  // ? Object.keys(itemId).map(key => ({
  //   key, value: itemId[key]
  // }))
  // : []
  
  return { productsArray, autoUpdateSort, pages, totalItems, allProducts, queryTotalPages, queryPages } // Removed autoUpdateId, itemId, searchId
}

export default GetItems
