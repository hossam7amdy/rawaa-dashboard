import { IconButton, Text } from "@chakra-ui/react";

import { Icon } from "../../components/UI/Icons";

const statusText = {
  1: "Pending",
  2: "Processing",
  3: "Rejected",
  4: "Completed",
  5: "Canceled",
};
const statusColor = {
  1: "orange.400",
  2: "teal.400",
  3: "red.400",
  4: "green.400",
  5: "gray.400",
};

export const StateText = ({ stateNumber, onShowForm }) => {
  return (
    <>
      <Text as="b" color={statusColor[stateNumber]}>
        {statusText[stateNumber]}
      </Text>
      {[1, 2].includes(stateNumber) && (
        <IconButton
          size="xs"
          icon={<Icon name="edit" />}
          onClick={onShowForm}
        />
      )}
    </>
  );
};
