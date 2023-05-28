import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

export const useFetchRequest = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsTotal, setSearchResultsTotal] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
    const fetchRequest = async (e) => {
      if (url === `/search/${id}`) {
        setSearchResults([]);
        const url = `/items/all?search=${id}`;
        await axios.get(url).then((response) => {
          setSearchResults(response.data.items);
          setSearchResultsTotal(response.data.total);
        });
      }
    };
    fetchRequest();
  }, [url]);

  return {
    searchResults,
    searchResultsTotal,
  };
};
