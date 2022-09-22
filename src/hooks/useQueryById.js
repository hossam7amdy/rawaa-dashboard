import { useQuery, useQueryClient } from "react-query";

import { PATH } from "../utils/config";
import { request } from "../utils/axios-utils";
import { useToast } from "@chakra-ui/react";

const queryFn = Object.freeze({
  staff: ({ queryKey }) => request({ url: `${PATH.STAFF}/${queryKey[1]}` }),
  orders: ({ queryKey }) => request({ url: `${PATH.ORDER}/${queryKey[1]}` }),
  products: ({ queryKey }) =>
    request({ url: `${PATH.PRODUCT}/${queryKey[1]}` }),
  categories: ({ queryKey }) =>
    request({ url: `${PATH.CATEGORY}/${queryKey[1]}` }),
  restaurants: ({ queryKey }) =>
    request({ url: `${PATH.RESTAURANT}/${queryKey[1]}` }),
});

const useQueryById = ({ key, id }) => {
  console.log(key, id);
  const toast = useToast();
  const queryClient = useQueryClient();

  return useQuery([key, id], queryFn[key], {
    onError: (error) =>
      toast({
        title: "Failed",
        description: `Error Occurred: ${error.message}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      }),
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
