import { Text, useColorModeValue } from "@chakra-ui/react";

export const State = ({ isActive }) => {
  const redColor = useColorModeValue("red.200", "red.400");
  const greenColor = useColorModeValue("green.200", "green.400");

  return (
    <Text
      rounded="xl"
      w="min-content"
      px={1}
      bg={isActive ? greenColor : redColor}
    >
      {isActive ? "Active" : "Inactive"}
    </Text>
  );
};
