import { VStack, HStack } from "@chakra-ui/react";

import Chart from "../components/chart/Chart";
import Widget from "../components/widget/Widget";
import RevenueProgress from "../components/featured/RevenueProgress";

// {title, cur, prev, isMoney}
const Home = () => {
  return (
    <VStack minW="full">
      <HStack w="full">
        <Widget title="Customers" cur={500} prev={123} />
        <Widget title="Orders" cur={500} prev={123} />
        <Widget title="Revenue" cur={500} prev={123} isMoney={true} />
        <Widget title="Income" cur={500} prev={123} isMoney={true} />
      </HStack>
      <HStack w="full">
        <RevenueProgress w="35%" />
        <Chart w="65%" />
      </HStack>
    </VStack>
  );
};

export default Home;
