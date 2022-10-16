import { useContext } from "react";
import { Flex, VStack } from "@chakra-ui/react";

import { AuthContext } from "./context/auth";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";

const App = () => {
  const { isSidebarOpen } = useContext(AuthContext);

  return (
    <VStack minW="full" minH="100vh" spacing={0} overflow="hidden">
      <Header />
      <Flex flexGrow={1} w="100vw">
        {isSidebarOpen && <Sidebar />}
        <Main />
      </Flex>
    </VStack>
  );
};

export default App;
