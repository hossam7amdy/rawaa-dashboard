import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";

import { request } from "../utils/axios-utils";
import { PATH } from "../data/constants";

const queryFn = Object.freeze({
  staff: (options) => request({ url: PATH.STAFF, ...options }),
  orders: (options) => request({ url: PATH.ORDER, ...options }),
  products: (options) => request({ url: PATH.PRODUCT, ...options }),
  categories: (options) => request({ url: PATH.CATEGORY, ...options }),
  restaurants: (options) => request({ url: PATH.RESTAURANT, ...options }),
});

const useMutateData = (key) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const updateCache = async ({ method, data: newData }) => {
    if (method === "delete") return;
    if (key === "products" || key === "categories") {
      toast({
        title: "Pending",
        description:
          "Request is processing in the background, will inform you soon.",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const rollback = (error, _, context) => {
    const message = error?.response?.data?.message || error.message;
    toast({
      title: "Failed",
      description: message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    // rollback
    // queryClient.setQueriesData(key, context.previousData);
  };

  return useMutation(queryFn[key], {
    // TODO apply optimistic updates
    // 1. When mutate is called:
    onMutate: updateCache,
    // 2. If the mutation fails, use the context returned from onMutate to roll back
    onError: rollback,
    // 3. Always refetch after error or success:
    onSettled: () => queryClient.invalidateQueries(key),
    onSuccess: () =>
      toast({
        title: "Success",
        description: "Request completed successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      }),
  });
};

export default useMutateData;
