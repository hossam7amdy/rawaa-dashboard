import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

export const PageSizeInput = ({ pageSize, setPageSize }) => {
  return (
    <FormControl w="250px" display="flex" alignItems="center">
      <FormLabel>TableSize</FormLabel>
      <Input
        type="number"
        name="pageSize"
        defaultValue={pageSize}
        onChange={(event) => setPageSize(+event.target.value)}
      />
    </FormControl>
  );
};
