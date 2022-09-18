import { useEffect, useState } from "react";
import { Td, Th, Tr, Text, useColorModeValue } from "@chakra-ui/react";

import { STAFF_URL } from "../../lib/urls";
import TableBox from "../../components/table/TableBox";
import useFetch from "../../hooks/use-fetch";
import CustomButton from "../../components/UI/CustomButton";

// Helper Method
const formatDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24));

  const days = calcDaysPassed(new Date(date), new Date());

  if (days === 0) return `Today`;
  else if (days === 1) return `Yesterday`;
  else if (days <= 7) return `${days} Days Ago`;

  const toDate = new Date(date);
  return `${new Intl.DateTimeFormat(locale).format(toDate)}`;
};

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const { isLoading, error, fetchRequest } = useFetch();
  const redColor = useColorModeValue("red.200", "red.400");
  const greenColor = useColorModeValue("green.200", "green.400");

  useEffect(() => {
    const applyStaff = (data) => {
      setStaff(data);
    };

    fetchRequest({ url: `${STAFF_URL}/all` }, applyStaff);
  }, [fetchRequest]);

  const headerRows = (
    <Tr>
      <Th>id</Th>
      <Th>username</Th>
      <Th>job</Th>
      <Th>branch</Th>
      <Th>Joined</Th>
      <Th>status</Th>
      <Th>action</Th>
    </Tr>
  );

  const bodyRows = staff.map((emp) => (
    <Tr key={emp.id}>
      <Td>{emp.id}</Td>
      <Td>{emp.userName}</Td>
      <Td>{emp.jop}</Td>
      <Td>{emp.restaurantId}</Td>
      <Td>{formatDate(emp.createOn)}</Td>
      <Td>
        <Text
          rounded="xl"
          w="min-content"
          px={1}
          bg={emp.active ? greenColor : redColor}
        >
          {emp.active ? "Active" : "Inactive"}
        </Text>
      </Td>
      <Td>
        <CustomButton
          size="xs"
          name="Edit State"
          variant="outline"
          colorScheme="yellow"
        />
      </Td>
    </Tr>
  ));

  return (
    <TableBox
      error={error}
      title={"Staff"}
      hasButton={true}
      bodyRows={bodyRows}
      isLoading={isLoading}
      headerRows={headerRows}
    />
  );
};

export default Staff;
