import { useEffect, useState } from "react";
import axios from "axios";
import "./items.css";
import { useLocation, useParams } from "react-router-dom";

const getItemById = () => {
  const [searchId, setSearchId] = useState("");
  const [item, setItem] = useState({}); //? OBJECT for each individual item ID
  const location = useLocation();
  const { id } = useParams()

  const autoUpdateId = (newSearchId) => {
    setSearchId(newSearchId);
  };

  useEffect(() => {
    //? GETS THE REQUESTED ITEM
    const controller = new AbortController(); // ?necessary for cleanup
    const getItemById = async () => {
      const url = `/items/${searchId}`;
      await axios
        .get(url, { signal: controller.signal })
        .then((response) => setItem(response.data.item));
    };
    getItemById();

    return () => {
      //?cleanup
      controller.abort();
    };
  }, [searchId, id]);

  return { autoUpdateId, item };
};

export default getItemById;
