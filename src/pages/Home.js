import { Skeleton, Flex } from "@chakra-ui/react";

import Chart from "../components/chart/Chart";
import Widget from "../components/widget/Widget";
import useQueryData from "../hooks/useQueryData";
import RevenueProgress from "../components/featured/RevenueProgress";

const Home = () => {
  const { isLoading, data } = useQueryData("stats");

  return (
    <Skeleton
      as={Flex}
      gap={2}
      minW="full"
      flexDir="column"
      isLoaded={!isLoading}
    >
      <Flex w="full" gap={2}>
        <Widget title="Customers" cur={500} prev={420} />
        <Widget title="Orders" cur={250} prev={400} />
        <Widget
          title="Revenue"
          isMoney={true}
          cur={data?.day}
          prev={data?.yesterday}
        />
        <Widget
          title="Income"
          isMoney={true}
          cur={data?.day}
          prev={data?.yesterday}
        />
      </Flex>
      <Flex w="full" gap={2}>
        <RevenueProgress
          w="35%"
          today={data?.day}
          target={data?.yesterday || 500}
          lastWeek={data?.lastWeek}
          lastMonth={data?.lastMonth}
        />
        <Chart w="65%" />
      </Flex>
    </Skeleton>
  );
};

export default Home;
