import {
  Table,
  Thead,
  Tbody,
  TableCaption,
  TableContainer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { LIGHT_GRAY } from "../../lib/helpers";
import LoadingSpinner from "../UI/LoadingSpinner";

const DataTable = ({ isLoading, error, headerRows, bodyRows }) => {
  let caption;

  if (isLoading) {
    caption = (
      <TableCaption>
        <LoadingSpinner />
        <Text>Fetching table data...</Text>
      </TableCaption>
    );
  }

  if (error) {
    caption = (
      <TableCaption color="crimson">
        {error || "something went wrong!"}
      </TableCaption>
    );
  }

  if (!isLoading && !error) {
    caption = (
      <TableCaption>
        {bodyRows.length === 0 ? `table is empty` : `All available items`}
      </TableCaption>
    );
  }

  return (
    <TableContainer
      h="70vh"
      overflowY="auto"
      sx={{
        "&::-webkit-scrollbar": {
          w: 2,
        },
        "&::-webkit-scrollbar-track": {
          w: 6,
        },
        "&::-webkit-scrollbar-thumb": {
          rounded: "md",
          bg: useColorModeValue(...LIGHT_GRAY),
        },
      }}
    >
      <Table size="sm" border="1px">
        {caption}
        <Thead>{headerRows}</Thead>
        <Tbody>{bodyRows}</Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
