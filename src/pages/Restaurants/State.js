import { Text, useColorModeValue } from "@chakra-ui/react";

const RestaurantState = ({ state }) => {
  const redColor = useColorModeValue("red.200", "red.400");
  const tealColor = useColorModeValue("teal.200", "teal.400");
  const greenColor = useColorModeValue("green.200", "green.400");
  const yellowColor = useColorModeValue("yellow.200", "yellow.400");

  const stateColor = {
    1: greenColor,
    2: redColor,
    3: yellowColor,
    4: tealColor,
  };

  return (
    <Text rounded="xl" w="min-content" px={1} bg={stateColor[state]}>
      Soon
    </Text>
  );
};

export default RestaurantState;
