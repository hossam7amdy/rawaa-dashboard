import { useContext } from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import { AuthContext } from "./context/auth";

import NewRestaurant from "./pages/Restaurants/NewRestaurant";
import Restaurants from "./pages/Restaurants/Restaurants";
import NewCategory from "./pages/Categories/NewCategory";
import Categories from "./pages/Categories/Categories";
import NewProduct from "./pages/Products/NewProduct";
import NewStaff from "./pages/Staff/NewStaff";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products/Products";
import Details from "./pages/Details";
import Orders from "./pages/Orders/Orders";
import Login from "./pages/Login";
import Staff from "./pages/Staff/Staff";
import Home from "./pages/Home";

import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

const App = () => {
  const { isLoggedIn, isSidebarOpen } = useContext(AuthContext);

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
          <Flex w="full" justify="center">
            <Routes>
              {!isLoggedIn && <Route path="/" element={<Login />} />}
              {isLoggedIn && (
                <Route path="/">
                  <Route index element={<Home />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="staff">
                    <Route index element={<Staff />} />
                    <Route path="new" element={<NewStaff />} />
                    <Route path="edit/:staffId" element={<NewStaff />} />
                    <Route path=":id" element={<Details from="staff" />} />
                  </Route>
                  <Route path="products">
                    <Route index element={<Products />} />
                    <Route path="new" element={<NewProduct />} />
                    <Route path="edit/:productId" element={<NewProduct />} />
                    <Route path=":id" element={<Details from="products" />} />
                  </Route>
                  <Route path="categories">
                    <Route index element={<Categories />} />
                    <Route path="new" element={<NewCategory />} />
                    <Route path="edit/:categoryId" element={<NewCategory />} />
                    <Route path=":id" element={<Details from="categories" />} />
                  </Route>
                  <Route path="restaurants">
                    <Route index element={<Restaurants />} />
                    <Route path="new" element={<NewRestaurant />} />
                    <Route
                      path="edit/:restaurantId"
                      element={<NewRestaurant />}
                    />
                    <Route
                      path=":id"
                      element={<Details from="restaurants" />}
                    />
                  </Route>
                </Route>
              )}
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Flex>
          <Spacer />
          <Flex as="footer" w="full" justify="center">
            <Footer />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default App;
