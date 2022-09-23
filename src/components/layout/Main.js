import { useContext } from "react";
import { Flex } from "@chakra-ui/react";

import Content from "./Content";
import Sidebar from "./Sidebar";
import { AuthContext } from "../../context/auth";

const Main = () => {
  const { isSidebarOpen } = useContext(AuthContext);

  return (
    <Flex w="full" h="full" as="main" overflow="hidden">
      {isSidebarOpen && <Sidebar />}
      <Content />
    </Flex>
  );
};

export default Main;
