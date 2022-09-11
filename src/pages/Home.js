import { VStack, HStack } from "@chakra-ui/react";

import Chart from "../components/chart/Chart";
import Widget from "../components/widget/Widget";
import RevenueProgress from "../components/featured/RevenueProgress";

// {title, cur, prev, isMoney}
const Home = () => {
  return (
    <VStack w="95%" mt={5}>
      <HStack w="100%">
        <Widget title="Customers" cur={500} prev={123} />
        <Widget title="Orders" cur={500} prev={123} />
        <Widget title="Revenue" cur={500} prev={123} isMoney={true} />
        <Widget title="Income" cur={500} prev={123} isMoney={true} />
      </HStack>
      <HStack h="56vh" w="100%">
        <RevenueProgress />
        <Chart />
      </HStack>
    </VStack>
  );
};

export default Home;
