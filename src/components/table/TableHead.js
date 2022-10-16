import { chakra, Thead, Th, Tr } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";

import { Icon } from "../UI/Icons";

export const TableHead = ({ table }) => {
  return (
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
                  {header.column.getIsSorted() ? (
                    header.column.getIsSorted() === "desc" ? (
                      <Icon name="downIcon" />
                    ) : (
                      <Icon name="upIcon" />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            );
          })}
        </Tr>
      ))}
    </Thead>
  );
};
