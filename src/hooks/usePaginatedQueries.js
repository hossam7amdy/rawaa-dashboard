import { useQuery } from "react-query";
import { useToast } from "@chakra-ui/react";

import { PATH } from "../data/constants";
import { request } from "../utils/axios-utils";

const queryFn = Object.freeze({
  orders: ({ queryKey }) => {
    const [, page, { day, pageSize, state }] = queryKey;
    return request({
      url: `${PATH.ORDER}/allJoinUserData?state=${state}&pageNumber=${page}&pageSize=${pageSize}&day=${day}`,
    });
  },
});

export const usePaginatedQueries = ({ key, page, ...queryDetails }) => {
  const toast = useToast();

  return useQuery([key, page, queryDetails], queryFn[key], {
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
