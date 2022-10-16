import { Box, useColorModeValue } from "@chakra-ui/react";
import { LIGHT_GRAY } from "../../data/constants";

const Card = ({ children, ...props }) => {
  return (
    <Box
      p={5}
      border="1px"
      borderColor="gray.200"
      rounded="md"
      shadow="md"
      overflowY="auto"
      sx={{
        "&::-webkit-scrollbar": {
          w: 2,
        },
        "&::-webkit-scrollbar-track": {
          w: 6,
        },
        "&::-webkit-scrollbar-thumb": {
          rounded: "md",
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
