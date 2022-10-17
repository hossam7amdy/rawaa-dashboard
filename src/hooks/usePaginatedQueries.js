import { useQuery } from "react-query";
import { useToast } from "@chakra-ui/react";

import { PATH } from "../data/constants";
import { request } from "../utils/axios-utils";

const queryFn = Object.freeze({
  orders: ({ queryKey }) => {
    const [, pageNumber, { day, pageSize, state }] = queryKey;
    return request({
      url: `${PATH.ORDER}/allJoinUserData?state=${state}&pageNumber=${pageNumber}&pageSize=${pageSize}&day=${day}`,
    });
  },
});

export const usePaginatedQueries = ({ key, pageNumber, ...queryDetails }) => {
  const toast = useToast();

  return useQuery([key, pageNumber, queryDetails], queryFn[key], {
    enabled: Boolean(pageNumber),
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
    keepPreviousData: false,
  });
};
