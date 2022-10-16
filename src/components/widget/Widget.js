import {
  Stat,
  Flex,
  StatLabel,
  StatArrow,
  StatHelpText,
  StatNumber,
} from "@chakra-ui/react";
import { Icon } from "../UI/Icons";

import { CURRENCY_FORMATER } from "../../utils/helpers";
import Card from "../UI/Card";

const Widget = ({ title, cur, prev, isMoney }) => {
  const isIncreasing = cur > prev;
  const diff = (Math.abs(cur - prev) / 100) * 100;
  const statValue = isMoney ? CURRENCY_FORMATER(cur) : cur;

  let icon;
  const iconConfig = {
    h: 6,
    w: 6,
    rounded: "md",
  };
  if (title === "Customers") {
    icon = <Icon name="person" {...iconConfig} bg="red.200" color="red.900" />;
  }
  if (title === "Orders") {
    icon = (
      <Icon
        name="cart"
        {...iconConfig}
        p={0.5}
        bg="yellow.200"
        color="yellow.900"
      />
    );
  }
  if (title === "Revenue") {
    icon = (
      <Icon name="dollar" {...iconConfig} bg="green.200" color="green.900" />
    );
  }
  if (title === "Income") {
    icon = (
      <Icon name="wallet" {...iconConfig} bg="purple.200" color="purple.900" />
    );
  }

  return (
    <Card w="100%">
      <Stat>
        <Flex justify="space-between">
          <StatLabel>{title}</StatLabel>
          {icon}
        </Flex>

        <StatNumber>{statValue}</StatNumber>

        <StatHelpText>
          <StatArrow type={isIncreasing ? "increase" : "decrease"} />
          {diff.toFixed(0)}
        </StatHelpText>
      </Stat>
    </Card>
  );
};

export default Widget;
