import { useContext } from "react";
import { Flex } from "@chakra-ui/react";

import Content from "./Content";
import Sidebar from "./Sidebar";
import { AuthContext } from "../../context/auth";

const Main = () => {
  const { isSidebarOpen } = useContext(AuthContext);

  return (
    <Flex as="main" flexGrow={1} w="100vw">
      {isSidebarOpen && <Sidebar />}
      <Content />
    </Flex>
  );
};

export default Main;
