import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Flex, Spacer } from "@chakra-ui/react";

import { AuthContext } from "./contexts/auth-context";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Orders from "./pages/Orders/Orders";
import Staff from "./pages/Staff/Staff";
import Customers from "./pages/Customers/Customers";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import Restaurants from "./pages/Restaurants/Restaurants";
import NotFound from "./pages/NotFound";
import NewProduct from "./pages/Products/NewProduct";
import NewCategory from "./pages/Categories/NewCategory";
import NewStaff from "./pages/Staff/NewStaff";
import NewRestaurant from "./pages/Restaurants/NewRestaurant";
import ProductDetails from "./pages/Products/ProductDetails";
import StaffDetails from "./pages/Staff/StaffDetails";

import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

const App = () => {
  const { loggedIn, isSidebarOpen } = useContext(AuthContext);

  return (
    <Flex flexDir="column" minH="100vh" align="stretch" justify="stretch">
      <Flex as="header" minH="50px">
        <Header />
      </Flex>
      <Flex as="main" flexGrow={1}>
        <Flex as="nav" flex={isSidebarOpen ? "1" : "0"}>
          {isSidebarOpen && <Sidebar />}
        </Flex>
        <Flex flexDir="column" flex={isSidebarOpen ? "6" : "1"}>
          <Flex w="100%" justify="center">
            <Routes>
              {!loggedIn && <Route path="/" element={<Login />} />}
              {loggedIn && (
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="staff" element={<Staff />} />
                  <Route path="/staff/new" element={<NewStaff />} />
                  <Route path="/staff/:staffId" element={<StaffDetails />} />
                  <Route path="customers" element={<Customers />} />
                  <Route path="products" element={<Products />} />
                  <Route path="/products/new" element={<NewProduct />} />
                  <Route path="/products/edit" element={<NewProduct />} />
                  <Route
                    path="/products/:productId"
                    element={<ProductDetails />}
                  />
                  <Route path="categories" element={<Categories />} />
                  <Route path="/categories/new" element={<NewCategory />} />
                  <Route path="/categories/edit" element={<NewCategory />} />
                  <Route path="restaurants" element={<Restaurants />} />
                  <Route path="/restaurants/new" element={<NewRestaurant />} />
                </Route>
              )}
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Flex>
          <Spacer />
          <Flex as="footer" w="100%" justify="center">
            <Footer />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default App;
