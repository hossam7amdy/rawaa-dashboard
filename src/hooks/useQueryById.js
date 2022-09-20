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
  staff: ({ queryKey }) => axios.get(`${STAFF_URL}/${queryKey[1]}`),
  orders: ({ queryKey }) => axios.get(`${ORDER_URL}/${queryKey[1]}`),
  products: ({ queryKey }) => axios.get(`${PRODUCT_URL}/${queryKey[1]}`),
  categories: ({ queryKey }) => axios.get(`${CATEGORY_URL}/${queryKey[1]}`),
  restaurants: ({ queryKey }) => axios.get(`${RESTAURANT_URL}/${queryKey[1]}`),
});

const useCategoryById = ({ key, id }) => {
  return useQuery([key, id], queryFn[key], {
    select: (data) => {
      return data.data;
    },
  });
};

export default useCategoryById;
