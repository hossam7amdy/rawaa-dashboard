import { Td, Th, Tr, Image, HStack, Button } from "@chakra-ui/react";

import { FILE_URL } from "../../lib/urls";
import useQueryData from "../../hooks/useQueryData";
import TableBox from "../../components/table/TableBox";

const Orders = () => {
  const { isLoading, error, data: orders } = useQueryData("orders");

  const headerRows = (
    <Tr>
      <Th>id</Th>
      <Th>image</Th>
      <Th>action</Th>
    </Tr>
  );

  const bodyRows = orders?.map((row) => (
    <Tr key={row.id}>
      <Td>{row.id}</Td>
      <Td>
        <Image
          src={FILE_URL + row.image}
          alt={row.image}
          rounded="md"
          boxSize="50px"
        />
      </Td>
      <Td>
        <HStack>
          <Button size="xs">Edit</Button>
          <Button size="xs">Delete</Button>
        </HStack>
      </Td>
    </Tr>
  ));

  return (
    <TableBox
      title={"Orders"}
      bodyRows={bodyRows}
      isLoading={isLoading}
      error={error?.message}
      headerRows={headerRows}
    />
  );
};

export default Orders;
