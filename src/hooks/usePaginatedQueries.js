import { useQuery } from "react-query";

import { PATH } from "../utils/config";
import { request } from "../utils/axios-utils";
import { useToast } from "@chakra-ui/react";

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
    keepPreviousData: false,
  });
};
