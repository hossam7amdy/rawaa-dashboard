import { useState } from "react";
import { HStack } from "@chakra-ui/react";

import { StateText } from "./StateText";
import { StateSelector } from "./StateSelector";

export const State = ({ order }) => {
  const [showForm, setShowForm] = useState(false);

  const stateNumber = order.orderStatus;

  return (
    <HStack>
      {!showForm && (
        <StateText
          stateNumber={stateNumber}
          onShowForm={() => setShowForm(true)}
        />
      )}
      {showForm && (
        <StateSelector
          order={order}
          stateNumber={stateNumber}
          onHideForm={() => setShowForm(false)}
        />
      )}
    </HStack>
  );
};
