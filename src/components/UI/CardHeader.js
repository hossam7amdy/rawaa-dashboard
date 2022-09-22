import { Heading, useColorModeValue } from "@chakra-ui/react";
import { GRAY_COLOR } from "../../utils/config";
import Card from "./Card";

const CardHeader = ({ title }) => {
  const color = useColorModeValue(...GRAY_COLOR);

  return (
    <Card my={5}>
      <Heading size="sm" textTransform="uppercase" color={color}>
        {title}
      </Heading>
    </Card>
  );
};

export default CardHeader;
