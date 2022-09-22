import { Td, Th, Tr, Image, HStack, Button } from "@chakra-ui/react";

import useQueryData from "../../hooks/useQueryData";
import TableBox from "../../components/table/TableBox";
import { PATH } from "../../utils/config";

const Orders = () => {
  const { isLoading, data: orders } = useQueryData("orders");

  const headerRows = (
    <Tr>
      <Th>id</Th>
      <Th>image</Th>
      <Th>action</Th>
    </Tr>
  );

  const bodyRows = orders?.map((order) => (
    <Tr key={order.id}>
      <Td>{order.id}</Td>
      <Td>
        <Image
          src={PATH.FILE + order.image}
          alt={order.image}
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
      bodyRows={bodyRows || []}
      isLoading={isLoading}
      headerRows={headerRows}
    />
  );
};

export default Orders;
