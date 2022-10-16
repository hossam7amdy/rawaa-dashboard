import { HStack, IconButton } from "@chakra-ui/react";

import { Icon } from "../../components/UI/Icons";

export const PageNumberInput = ({ setPageNumber, pageNumber, isLast }) => {
  const setPageNumberHandler = (arrow) => {
    if (arrow === "prev" && pageNumber !== 1) {
      setPageNumber((prev) => prev - 1);
    }
    if (arrow === "next" && !isLast) {
      setPageNumber((prev) => prev + 1);
    }
  };

  return (
    <HStack>
      <IconButton
        icon={<Icon name="arrowLeft" />}
        isDisabled={pageNumber === 1}
        onClick={() => setPageNumberHandler("prev")}
      />
      <IconButton
        icon={<Icon name="arrowRight" />}
        isDisabled={isLast}
        onClick={() => setPageNumberHandler("next")}
      />
    </HStack>
  );
};
