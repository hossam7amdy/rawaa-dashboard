import {
  Flex,
  Stat,
  Text,
  VStack,
  HStack,
  StatLabel,
  StatArrow,
  StatNumber,
  StatHelpText,
  CircularProgress,
  useColorModeValue,
  CircularProgressLabel,
} from "@chakra-ui/react";

import { CURRENCY_FORMATER, GRAY_COLOR } from "../../utils/config";
import Card from "../UI/Card";

const RevenueProgress = ({
  today = 5,
  target,
  lastWeek,
  lastMonth,
  ...props
}) => {
  const color = useColorModeValue(...GRAY_COLOR);
  const redColor = useColorModeValue("red.200", "red.700");
  const greenColor = useColorModeValue("green.200", "green.500");

  const progressValue = (today / target) * 100;

  return (
    <Card {...props}>
      <Text fontSize="larger" fontWeight="semibold" color={color}>
        Total Revenue
      </Text>
      <VStack>
        <CircularProgress
          value={progressValue}
          size="100px"
          thickness="4px"
          aria-label="daily-progressbar"
        >
          <CircularProgressLabel>
            {progressValue.toFixed(1)}%
          </CircularProgressLabel>
        </CircularProgress>
        <Text color={color}>Total sales made today</Text>
        <Text fontSize="xx-large">{CURRENCY_FORMATER(today)}</Text>
        <Text fontSize="xs" color={color}>
          Previous transactions processing. Last payments may not be included.
        </Text>
        <HStack w="xs">
          <Stat>
            <StatLabel color={color}>Target</StatLabel>
            <Flex align="start" gap={1}>
              <StatNumber fontSize="sm" color={redColor}>
                {CURRENCY_FORMATER(target)}
              </StatNumber>
              <StatHelpText>
                <StatArrow type={"decrease"} />
              </StatHelpText>
            </Flex>
          </Stat>
          <Stat>
            <StatLabel color={color}>Last week</StatLabel>
            <Flex align="start" gap={1}>
              <StatNumber fontSize="sm" color={greenColor}>
                {CURRENCY_FORMATER(lastWeek)}
              </StatNumber>
              <StatHelpText>
                <StatArrow type={"increase"} />
              </StatHelpText>
            </Flex>
          </Stat>
          <Stat>
            <StatLabel color={color}>Last Month</StatLabel>
            <Flex align="start" gap={1}>
              <StatNumber fontSize="sm" color={greenColor}>
                {CURRENCY_FORMATER(lastMonth)}
              </StatNumber>
              <StatHelpText>
                <StatArrow type={"increase"} />
              </StatHelpText>
            </Flex>
          </Stat>
        </HStack>
      </VStack>
    </Card>
  );
};

export default RevenueProgress;
