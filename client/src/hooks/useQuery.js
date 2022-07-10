import { useState, useEffect } from "react";
import axios from "axios";

const useQuery = ({ method, endpoint }) => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const baseUrl = "http://localhost:4001";
  const url = baseUrl + endpoint;

  useEffect(() => {
    axios[method](url)
      .then((response) => {
        setIsFetching(false);
        setData(response.data);
      })
      .catch((error) => {
        setIsFetching(false);
        console.log(error);
      });
  }, [method, endpoint, url]);

  return { data, isFetching };
};

export default useQuery;
