import { Box, useColorModeValue } from "@chakra-ui/react";
import { GRAY_COLOR, LIGHT_GRAY, SCROLLBAR_STYLE } from "../../lib/helpers";

const Card = ({ children, ...props }) => {
  return (
    <Box
      p={5}
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      shadow="md"
      overflowY="auto"
      __css={{
        "&::-webkit-scrollbar": {
          w: 1,
        },
        "&::-webkit-scrollbar-track": {
          w: 3,
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "md",
          bg: useColorModeValue(...LIGHT_GRAY),
        },
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
