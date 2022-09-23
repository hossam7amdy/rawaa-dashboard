import { NavLink } from "react-router-dom";
import { Box, Heading, HStack } from "@chakra-ui/react";

import DataTable from "./DataTable";
import CustomButton from "../UI/CustomButton";

const TableBox = ({ title, hasButton, ...props }) => {
  return (
    <Box w="full">
      <HStack justify="space-between" mb={3}>
        <Heading size="lg" color="gray.400">
          {title}
        </Heading>

        {hasButton && (
          <NavLink to={"new"}>
            <CustomButton name="Add New" colorScheme="teal" />
          </NavLink>
        )}
      </HStack>

      <DataTable {...props} />
    </Box>
  );
};

export default TableBox;
