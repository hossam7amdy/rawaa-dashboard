import { useCallback, useState } from "react";
import { TIMEOUT_SEC } from "../lib/config";

const timeout = (seconds) => {
  return new Promise((_, rejecet) => {
    setTimeout(() => {
      rejecet(
        new Error(`Request timeout after ${seconds} seconds. Try again!`)
      );
    }, seconds * 1000);
  });
};

const useFetch = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRequest = useCallback(async (requestConfig, applyData) => {
    setError(null);
    setIsLoading(true);
    const { url, requestOptions } = requestConfig;

    try {
      const fetchPro = requestOptions ? fetch(url, requestOptions) : fetch(url);
      const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

      if (!response.ok) {
        throw new Error(response.message || "Request failed");
      }

      const data = await response.json();
      if (!applyData) return;
      console.log(data);
      applyData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    error,
    isLoading,
    fetchRequest,
  };
};

export default useFetch;
