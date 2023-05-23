import { useEffect, useState } from "react";
import axios from "axios";
import "./items.css";
import { useParams } from "react-router-dom";

const getItemById = () => {
  const [item, setItem] = useState({}); //? OBJECT for each individual item ID
  const { id } = useParams()

  useEffect(() => {
    //? GETS THE REQUESTED ITEM
    const controller = new AbortController(); // ?necessary for cleanup
    const getItemById = async () => {
      if(location.pathname === `/items/${id}` || location.pathname === `/popularitems/${id}`) {
      setItem({})
      const url = `/items/${id}`;
      await axios
        .get(url, { signal: controller.signal })
        .then((response) => setItem(response.data.item));
    };}
    getItemById();

    return () => {
      //?cleanup
      controller.abort();
    };
  }, [id]);

  return { item, id };
};

export default getItemById;
