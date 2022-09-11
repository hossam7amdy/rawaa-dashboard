import { useEffect, useState } from "react";
import { TIMEOUT_SEC } from "../lib/helpers";

const timeout = (seconds) => {
  return new Promise((_, rejecet) => {
    setTimeout(() => {
      rejecet(
        new Error(`Request timeout after ${seconds} seconds. Try again!`)
      );
    }, seconds * 1000);
  });
};

const useFetch = (url = undefined, requestOptions = undefined) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAPI = async (url, requestOptions = undefined) => {
    setIsLoading(true);
    try {
      const fetchPro = requestOptions ? fetch(url, requestOptions) : fetch(url);

      const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
      if (!response.ok) throw new Error("Something went wrong");
      const responseData = await response.json();

      setData(responseData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAPI(url);
  }, [url]);

  return {
    data,
    error,
    isLoading,
    fetchAPI,
  };
};

export default useFetch;
