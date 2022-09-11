import {
  Image,
  Table,
  Thead,
  Tbody,
  TableCaption,
  TableContainer,
  Text,
  VStack,
  Tr,
  Flex,
  Heading,
  Th,
  Td,
} from "@chakra-ui/react";
import { Fragment } from "react";
import { DB_URL } from "../../lib/helpers";
import LoadingSpinner from "../UI/LoadingSpinner";

const DataTable = ({ title, isLoading, error, headerData, tableData }) => {
  const caption =
    headerData.length === 0
      ? `${title} table is empty`
      : `All available ${title.toLowerCase()} table`;

  return (
    <Fragment>
      {isLoading && (
        <VStack justify="center" align="center">
          <LoadingSpinner />
          <Text>Fetching data...</Text>
        </VStack>
      )}
      {error && (
        <Flex h="50vh" justify="center" align="center">
          <Heading size="md" color="crimson">
            {error || "something went wrong!"}
          </Heading>
        </Flex>
      )}
      {!isLoading && !error && (
        <TableContainer h="70vh" overflowY="auto">
          <Table size="sm" border="1px">
            <TableCaption>{caption}</TableCaption>
            <Thead>
              <Tr>
                {headerData.map((th) => (
                  <Th key={th}>{th}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((row) => (
                <Tr key={row.id}>
                  <Td>{row.id}</Td>
                  <Td>
                    <Image
                      src={`${DB_URL}FileUploads/GetPysicalFile/${row.image}`}
                      alt={row.image}
                      borderRadius="md"
                      boxSize="50px"
                    />
                  </Td>
                  <Td>{row.title}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Fragment>
  );
};

export default DataTable;
