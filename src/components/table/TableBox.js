import { Box, Flex, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import DataTable from "./DataTable";
import CustomButton from "../UI/CustomButton";
import useFetch from "../../hooks/use-fetch";
import { DB_URL } from "../../lib/helpers";

const TableBox = ({ title, hasButton }) => {
  const {
    isLoading,
    error,
    data: tableData,
  } = useFetch(`${DB_URL}Category/show_all`);

  let headerData = [];
  for (const key in tableData[0]) {
    headerData.push(key);
  }

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

      <DataTable
        title={title}
        headerData={headerData}
        tableData={tableData}
        isLoading={isLoading}
        error={error}
      />
    </Box>
  );
};

export default TableBox;
