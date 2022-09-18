import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import AuthProvider from "./store/auth";
import CategoryProvider from "./store/category";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ChakraProvider>
        <CategoryProvider>
          <App />
        </CategoryProvider>
      </ChakraProvider>
    </AuthProvider>
  </BrowserRouter>
);
