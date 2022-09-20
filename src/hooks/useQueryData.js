import axios from "axios";
import { useQuery } from "react-query";
import {
  ORDER_URL,
  STAFF_URL,
  PRODUCT_URL,
  CATEGORY_URL,
  RESTAURANT_URL,
} from "../lib/urls";

const queryFn = Object.freeze({
  staff: () => axios.get(`${STAFF_URL}/all`),
  orders: () => axios.get(`${ORDER_URL}/all`),
  products: () => axios.get(`${PRODUCT_URL}/all`),
  categories: () => axios.get(`${CATEGORY_URL}/all`),
  restaurants: () => axios.get(`${RESTAURANT_URL}/all`),
});

const useCategoryData = (key) => {
  return useQuery(key, queryFn[key], {
    select: (data) => {
      return data.data;
    },
  });
};

export default useCategoryData;
