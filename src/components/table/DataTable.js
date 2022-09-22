import { useState } from "react";
import {
  Tr,
  Th,
  Td,
  Text,
  Table,
  Thead,
  Tbody,
  chakra,
  TableCaption,
  TableContainer,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { LIGHT_GRAY } from "../../utils/config";
import LoadingSpinner from "../UI/LoadingSpinner";
import { getIconByName } from "../../utils/IconsFactory";

const DataTable = ({ isLoading, data, columns }) => {
  const [sorting, setSorting] = useState();
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  let caption;
  if (isLoading) {
    caption = (
      <TableCaption>
        <LoadingSpinner />
        <Text>Fetching table data...</Text>
      </TableCaption>
    );
  }

  if (!isLoading) {
    caption = (
      <TableCaption>
        {data.length === 0 ? `table is empty` : `All available items`}
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
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr cursor="pointer" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <chakra.span pl="4">
                      {header.column.getIsSorted()
                        ? header.column.getIsSorted() === "desc"
                          ? getIconByName("downIcon")
                          : getIconByName("upIcon")
                        : null}
                    </chakra.span>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta = cell.column.columnDef.meta;
                return (
                  <Td key={cell.id} isNumeric={meta?.isNumeric}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
