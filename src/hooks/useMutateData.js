import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";

import { request } from "../utils/axios-utils";
import { PATH, PENDING_TOAST, SUCCESS_TOAST } from "../utils/config";

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
      toast(PENDING_TOAST);
    }
  };

  const rollback = (error, _, context) => {
    // render toast
    toast({
      title: "Failed",
      description: `Error Occurred: ${error.message}`,
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
    onSuccess: () => toast(SUCCESS_TOAST),
  });
};

export default useMutateData;
