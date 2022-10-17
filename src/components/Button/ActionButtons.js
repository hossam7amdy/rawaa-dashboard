import { HStack } from "@chakra-ui/react";

import CustomButton from "./CustomButton";

export const ActionButtons = ({ onView, onDelete }) => {
  return (
    <HStack>
      <CustomButton
        name="View"
        size="xs"
        variant="outline"
        colorScheme="green"
        onClick={onView}
      />
      <CustomButton
        name="Delete"
        size="xs"
        variant="outline"
        colorScheme="red"
        onClick={onDelete}
      />
    </HStack>
  );
};
