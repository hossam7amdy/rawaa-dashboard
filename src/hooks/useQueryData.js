import { useQuery } from "react-query";
import { useToast } from "@chakra-ui/react";

import { PATH } from "../data/constants";
import { request } from "../utils/axios-utils";

const queryFn = Object.freeze({
  stats: () => request({ url: PATH.STATS }),
  staff: () => request({ url: `${PATH.STAFF}/all` }),
  orders: () => request({ url: `${PATH.ORDER}/all` }),
  products: () => request({ url: `${PATH.PRODUCT}/all` }),
  categories: () => request({ url: `${PATH.CATEGORY}/all` }),
  restaurants: () => request({ url: `${PATH.RESTAURANT}/all` }),
});

const useQueryData = (key) => {
  const toast = useToast();
  return useQuery(key, queryFn[key], {
    onError: (error) => {
      const message = error?.response?.data?.message || error.message;
      toast({
        title: "Failed",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    },
    select: (data) => {
      return data.data;
    },
  });
};

export default useQueryData;
