import { NavLink } from "react-router-dom";
import { Box, Flex, Heading } from "@chakra-ui/react";

import DataTable from "./DataTable";
import CustomButton from "../UI/CustomButton";

const TableBox = ({ title, hasButton, ...props }) => {
  return (
    <Box h="80vh" w="100%" m={3}>
      <Flex justify="space-between" align="center" p={2}>
        <Heading size="lg" color="gray.400">
          {title}
        </Heading>

        {hasButton && (
          <NavLink to={"new"}>
            <CustomButton name="Add New" />
          </NavLink>
        )}
      </Flex>

      <DataTable {...props} />
    </Box>
  );
};

export default TableBox;
