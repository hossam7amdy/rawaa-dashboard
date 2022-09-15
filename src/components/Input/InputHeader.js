import { Heading, useColorModeValue } from "@chakra-ui/react";
import { GRAY_COLOR } from "../../lib/helpers";
import Card from "../UI/Card";

const InputHeader = ({ title }) => {
  const color = useColorModeValue(...GRAY_COLOR);

  return (
    <Card my={5}>
      <Heading size="sm" textTransform="uppercase" color={color}>
        {title}
      </Heading>
    </Card>
  );
};

export default InputHeader;
