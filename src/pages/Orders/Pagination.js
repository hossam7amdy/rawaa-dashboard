import {
  Input,
  HStack,
  Select,
  FormLabel,
  IconButton,
  FormControl,
} from "@chakra-ui/react";
import { useEffect, useReducer } from "react";

import { Icon } from "../../components/UI/Icons";
import { ORDER_STATES } from "../../data/constants";

const initialValues = {
  state: 1,
  pageSize: 10,
  pageNumber: 1,
};

const reducer = (state, action) => {
  if (action.type === "size") {
    return {
      ...state,
      pageSize: action.pageSize,
    };
  }
  if (action.type === "number") {
    return {
      ...state,
      pageNumber: action.pageNumber,
    };
  }
  if (action.type === "state") {
    return {
      ...state,
      state: action.state,
    };
  }
  return initialValues;
};

export const Pagination = ({ length, setPaginationValues }) => {
  const [paginationValues, dispatch] = useReducer(reducer, initialValues);
  const isLast = length < paginationValues.pageSize;

  useEffect(() => {
    setPaginationValues(paginationValues);
  }, [setPaginationValues, paginationValues]);

  const handlePageNumber = (arrow) => {
    const curPageNum = paginationValues.pageNumber;

    if (arrow === "prev" && curPageNum !== 1) {
      dispatch({ type: "number", pageNumber: curPageNum - 1 });
    }

    if (arrow === "next" && !isLast) {
      dispatch({ type: "number", pageNumber: curPageNum + 1 });
    }
  };

  const handlePageSize = (size) => {
    dispatch({ type: "size", pageSize: size });
  };

  const handleOrdersState = (state) => {
    dispatch({ type: "state", state });
  };

  return (
    <HStack spacing={10}>
      <HStack>
        <IconButton
          icon={<Icon name="arrowLeft" />}
          isDisabled={paginationValues.pageNumber === 1}
          onClick={() => handlePageNumber("prev")}
        />
        <IconButton
          icon={<Icon name="arrowRight" />}
          isDisabled={isLast}
          onClick={() => handlePageNumber("next")}
        />
      </HStack>

      <FormControl w="250px" display="flex" alignItems="center">
        <FormLabel>TableSize</FormLabel>
        <Input
          type="number"
          name="pageSize"
          defaultValue={paginationValues.pageSize}
          onChange={(event) => handlePageSize(+event.target.value)}
        />
      </FormControl>

      <Select
        w="200px"
        value={paginationValues.state}
        onChange={(event) => handleOrdersState(+event.target.value)}
      >
        {ORDER_STATES.map((option, idx) => (
          <option key={idx} value={option.key}>
            {option.value}
          </option>
        ))}
      </Select>
    </HStack>
  );
};
