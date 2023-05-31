import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useFilter } from "../../hooks/filtering";

export const useFetchRequest = () => {
  const { filter, autoUpdateFilter } = useFilter()
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsTotal, setSearchResultsTotal] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
    const fetchRequest = async (e) => {
      // if (url === `/search/${id}`) {
        setSearchResults([]);
        // ?search=item&sortField=date&sortOrder=desc
        const url = `/items/all?search=${id}&sortOrder=${filter.order}&sortField=${filter.sort}`;
        await axios.get(url).then((response) => {
          setSearchResults(response.data.items);
          setSearchResultsTotal(response.data.total);
        });
      // }
    };
    fetchRequest();
  }, [filter, url]);

  return {
    searchResults,
    searchResultsTotal,
    autoUpdateFilter
  };
};
