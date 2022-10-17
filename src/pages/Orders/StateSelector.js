import { useState } from "react";
import { IconButton, Select } from "@chakra-ui/react";

import { ORDER_STATES } from "../../data/constants";
import useMutateData from "../../hooks/useMutateData";
import { Icon } from "../../components/UI/Icons";

export const StateSelector = ({ order, stateNumber, onHideForm }) => {
  const [newStateNumber, setNewStateNumber] = useState("");
  const { mutate } = useMutateData("orders");

  const editOrderStateHandler = () => {
    if (!newStateNumber || stateNumber === newStateNumber) return;

    const config = {
      method: "put",
      data: {
        ...order,
        orderStatus: newStateNumber,
      },
    };
    mutate(config);

    onHideForm();
    setNewStateNumber("");
  };

  const options = ORDER_STATES.filter(
    (option) => option.key > stateNumber && option.key !== 5
  );

  return (
    <>
      <Select
        size="xs"
        value={newStateNumber}
        placeholder="select status"
        onChange={(event) => setNewStateNumber(+event.target.value)}
      >
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </Select>
      <IconButton
        size="xs"
        icon={<Icon name="check" />}
        onClick={() => editOrderStateHandler(order)}
      />
      <IconButton
        size="xs"
        icon={<Icon name="close" />}
        onClick={() => {
          onHideForm();
          setNewStateNumber("");
        }}
      />
    </>
  );
};
