import { Text, useColorModeValue } from "@chakra-ui/react";

const RestaurantState = ({ state }) => {
  const redColor = useColorModeValue("red.200", "red.400");
  const tealColor = useColorModeValue("teal.200", "teal.400");
  const greenColor = useColorModeValue("green.200", "green.400");
  const yellowColor = useColorModeValue("yellow.200", "yellow.400");

  if (state === 1)
    return (
      <Text rounded="xl" w="min-content" px={1} bg={greenColor}>
        Open
      </Text>
    );
  if (state === 2) {
    return (
      <Text rounded="xl" w="min-content" px={1} bg={redColor}>
        Closed
      </Text>
    );
  }
  if (state === 3) {
    return (
      <Text rounded="xl" w="min-content" px={1} bg={yellowColor}>
        Maintenance
      </Text>
    );
  }
  return (
    <Text rounded="xl" w="min-content" px={1} bg={tealColor}>
      Soon
    </Text>
  );
};

export default RestaurantState;
