import { useContext } from "react";
import { Text, useColorModeValue } from "@chakra-ui/react";
import { AreaChart, XAxis, CartesianGrid, Tooltip, Area } from "recharts";

import Card from "../UI/Card";
import { GRAY_COLOR } from "../../lib/helpers";
import { AuthContext } from "../../contexts/auth-context";

const data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
];

const Chart = () => {
  const { isSidebarOpen } = useContext(AuthContext);
  const color = useColorModeValue(...GRAY_COLOR);
  const strokeColor = useColorModeValue("lightgray", "#2D3748");
  const width = isSidebarOpen ? 620 : 730;

  return (
    <Card w="65%" h="100%">
      <Text fontSize="larger" fontWeight="semibold" mb={5} color={color}>
        Last 6 Months (Revenue)
      </Text>
      <AreaChart
        width={width}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <CartesianGrid strokeDasharray="3 3" stroke={strokeColor} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="Total"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </Card>
  );
};

export default Chart;
