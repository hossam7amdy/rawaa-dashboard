import { getIconByName } from "../../lib/IconStore";
import {
  Link,
  Stat,
  Flex,
  StatLabel,
  StatArrow,
  StatHelpText,
  StatNumber,
} from "@chakra-ui/react";
import Card from "../UI/Card";

// {title, cur, prev, isMoney}
const Widget = (props) => {
  const { title, cur, prev } = props;
  const isIncreasing = cur > prev;
  const diff = (Math.abs(cur - prev) / 100) * 100;
  const statValue = props?.isMoney ? `$${cur.toFixed(1)}` : cur;
  const link = title.toLowerCase();
  let linkText = `See all ${link}`;
  let icon;

  const iconConfig = {
    h: 6,
    w: 6,
    rounded: "md",
  };
  if (link === "customers") {
    icon = getIconByName("person", {
      ...iconConfig,
      bg: "red.200",
      color: "red.900",
    });
  }
  if (link === "orders") {
    icon = getIconByName("cart", {
      ...iconConfig,
      p: 0.5,
      bg: "yellow.200",
      color: "yellow.900",
    });
  }
  if (link === "revenue") {
    linkText = "See details";
    icon = getIconByName("dollar", {
      ...iconConfig,
      bg: "green.200",
      color: "green.900",
    });
  }
  if (link === "income") {
    linkText = "See details";
    icon = getIconByName("wallet", {
      ...iconConfig,
      bg: "purple.200",
      color: "purple.900",
    });
  }

  return (
    <Card w="100%">
      <Stat>
        <Flex justify="space-between">
          <StatLabel>{title}</StatLabel>
          <StatHelpText>
            <StatArrow type={isIncreasing ? "increase" : "decrease"} />
            {diff.toFixed(0)}
          </StatHelpText>
        </Flex>

        <StatNumber>{statValue}</StatNumber>

        <StatHelpText
          display="flex"
          justifyContent="space-between"
          alignItems="end"
        >
          <Link href={`/${link}`}>{linkText}</Link>
          {icon}
        </StatHelpText>
      </Stat>
    </Card>
  );
};

export default Widget;
