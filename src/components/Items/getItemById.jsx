import {useEffect, useState} from 'react'
import axios from 'axios'
import "./items.css"

const getItemById = () => {
    const [searchId, setSearchId] = useState('')
    const [item, setItem] = useState({}) //? OBJECT for each individual item ID

    const autoUpdateId = (newSearchId) => {
        setSearchId(newSearchId)
      }

    useEffect(() => { //? GETS THE REQUESTED ITEM
        const controller = new AbortController() // ?necessary for cleanup
        const getItemById = async () => {
          setItem({})
          const url = `/items/${searchId}`
          await axios.get(url, {signal: controller.signal})
                .then(response => (setItem(response.data.item)))
        }
        getItemById()
        
        return () => { //?cleanup
          controller.abort()
        }
      }, [searchId])

    return {autoUpdateId, item}
}

export default getItemById