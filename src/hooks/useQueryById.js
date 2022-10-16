import { useToast } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "react-query";

import { PATH } from "../data/constants";
import { request } from "../utils/axios-utils";

const queryFn = Object.freeze({
  staff: ({ queryKey }) => request({ url: `${PATH.STAFF}/${queryKey[1]}` }),
  order: ({ queryKey }) =>
    request({ url: `${PATH.ORDER}/orderDetail/${queryKey[1]}` }),
  products: ({ queryKey }) =>
    request({ url: `${PATH.PRODUCT}/${queryKey[1]}` }),
  categories: ({ queryKey }) =>
    request({ url: `${PATH.CATEGORY}/${queryKey[1]}` }),
  restaurants: ({ queryKey }) =>
    request({ url: `${PATH.RESTAURANT}/${queryKey[1]}` }),
  address: ({ queryKey }) => request({ url: `${PATH.ADDRESS}/${queryKey[1]}` }),
});

const useQueryById = ({ key, id }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useQuery([key, id], queryFn[key], {
    enabled: Boolean(id),
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
    initialData: () => {
      const data = queryClient
        .getQueryData(key)
        ?.data?.find((item) => item.id === parseInt(id));

      return data ? data : undefined;
    },
  });
};

export default useQueryById;
