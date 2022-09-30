import { VStack } from "@chakra-ui/react";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";

const App = () => {
  return (
    <VStack minW="full" minH="100vh" spacing={0} overflow="hidden">
      <Header />
      <Main />
    </VStack>
  );
};

export default App;
