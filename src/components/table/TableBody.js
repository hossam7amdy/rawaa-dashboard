import { Tr, Td, Tbody } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";

export const TableBody = ({ table }) => {
  return (
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
  );
};
