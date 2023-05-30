import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useFilter } from "./sorting";

const GetItems = () => {
  const [products, setProducts] = useState([]);
  const [all, setAll] = useState([]);
  const [pages, setPages] = useState("");
  const [queryPages, setQueryPages] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [queryTotalPages, setQueryTotalPages] = useState("");
  const [minimumPrice, setMinimumPrice] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");
  const controller = new AbortController();
  const location = useLocation();
  const url = location.pathname;
  const navigate = useNavigate();
  const { filter, autoUpdateFilter } = useFilter();

  useEffect(() => {
    //? ITEMS DIVIDED BY PAGE
    const getItemsByPage = async () => {
      if (url === "/") {
        //? get items divided by page only if the path is /home
        setProducts([]);
        setPages("");
        setTotalItems("");
        const url = `/items?sortOrder=${filter.order}&sortField=${filter.sort}&limit=${filter.limit}&page=${filter.page}&category=${filter.category}&minprice=${filter.minprice}&maxprice=${filter.maxprice}`;
        await axios.get(url, { signal: controller.signal }).then((response) => {
          setProducts(response.data.items),
            setPages(response.data.totalPages),
            setQueryPages(response.data.queryTotal),
            setTotalItems(response.data.total),
            setQueryTotalPages(response.data.queryTotalPages);
          setMaximumPrice(response.data.highestPrice);
          setMinimumPrice(response.data.lowestPrice);
        });
      }
    };

    getItemsByPage();

    return () => {
      controller.abort(); //?If user makes another request before the next one is completed, it gets cancelled
    };
  }, [filter, url, navigate]);

  useEffect(() => {
    //!Might optimize this
    //? GETS ALL THE ITEMS
    const controller = new AbortController();
    const getAllItems = async () => {
      if (
        //? get all the items only if the path is either delete, or update item
        url === "/deleteitem" ||
        url === "/updateitem"
      ) {
        setAll([]);
        const url = "/items/all";
        await axios
          .get(url, { signal: controller.signal })
          .then((response) => setAll(response.data.items));
      }
    };

    getAllItems();

    return () => {
      controller.abort();
    };
  }, [url]);

  const mapItems = (items) => {
    return items.map((item) => ({
      _id: item._id,
      title: item.title,
      price: item.price,
      description: item.description,
      date: item.date,
      category: item.category,
      amount: item.amount,
      isPopular: item.isPopular,
      image: item.image,
    }));
  };

  const productsArray = mapItems(products);
  const allProducts = mapItems(all);

  return {
    productsArray,
    autoUpdateFilter,
    pages,
    totalItems,
    allProducts,
    queryTotalPages,
    queryPages,
    minimumPrice,
    maximumPrice,
  };
};

export default GetItems;
