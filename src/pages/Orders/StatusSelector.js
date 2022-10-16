import { Select } from "@chakra-ui/react";

import { ORDER_STATES } from "../../data/constants";

export const StateSelector = ({ ordersState, setOrdersState }) => {
  return (
    <Select
      w="200px"
      value={ordersState}
      onChange={(event) => setOrdersState(+event.target.value)}
    >
      {ORDER_STATES.map((option, idx) => (
        <option key={idx} value={option.key}>
          {option.value}
        </option>
      ))}
    </Select>
  );
};
