import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  HStack,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";

import { GRAY_COLOR } from "../../lib/helpers";
import Card from "../UI/Card";

const RevenueProgress = () => {
  const color = useColorModeValue(...GRAY_COLOR);
  const greenColor = useColorModeValue("green.200", "green.500");
  const redColor = useColorModeValue("red.200", "red.700");

  return (
    <Card w="35%" h="100%">
      <Text fontSize="larger" fontWeight="semibold" color={color}>
        Total Revenue
      </Text>
      <VStack>
        <CircularProgress value={70} size="100px" thickness="4px">
          <CircularProgressLabel>70%</CircularProgressLabel>
        </CircularProgress>
        <Text color={color}>Total sales made today</Text>
        <Text fontSize="xx-large">$420</Text>
        <Text fontSize="xs" color={color}>
          Previous transactions processing. Last payments may not be included.
        </Text>
        <HStack w="100%">
          <Stat>
            <StatLabel color={color}>Target</StatLabel>
            <Flex align="start" gap={1}>
              <StatNumber fontSize="sm" color={redColor}>
                $12.4k
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
                $12.4k
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
                $12.4k
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
