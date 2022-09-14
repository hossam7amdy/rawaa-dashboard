import { Td, Th, Tr, Image, HStack, Button } from "@chakra-ui/react";
import TableBox from "../../components/table/TableBox";
import useFetch from "../../hooks/use-fetch";
import { BASE_URL } from "../../lib/helpers";

const Staff = () => {
  const {
    isLoading,
    error,
    data: tableData,
  } = useFetch(`${BASE_URL}/en/api/cp/staff/all`);

  const headerRows = (
    <Tr>
      <Th>id</Th>
      <Th>image</Th>
      <Th>action</Th>
    </Tr>
  );

  const bodyRows = tableData.map((row) => (
    <Tr key={row.id}>
      <Td>{row.id}</Td>
      <Td>
        <Image
          src={`${BASE_URL}/api/file/${row.image}`}
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
      title={"Staff"}
      headerRows={headerRows}
      bodyRows={bodyRows}
      isLoading={isLoading}
      hasButton={true}
      error={error}
    />
  );
};

export default Staff;
