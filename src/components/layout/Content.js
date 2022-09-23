import { Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import NewRestaurant from "../../pages/Restaurants/NewRestaurant";
import Restaurants from "../../pages/Restaurants/Restaurants";
import NewCategory from "../../pages/Categories/NewCategory";
import Categories from "../../pages/Categories/Categories";
import NewProduct from "../../pages/Products/NewProduct";
import NewStaff from "../../pages/Staff/NewStaff";
import NotFound from "../../pages/NotFound";
import Products from "../../pages/Products/Products";
import Details from "../../pages/Details";
import Orders from "../../pages/Orders/Orders";
import Login from "../../pages/Login";
import Staff from "../../pages/Staff/Staff";
import Home from "../../pages/Home";

import { AuthContext } from "../../context/auth";

const Content = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Flex flex={1} p={2}>
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
              <Route path="edit/:restaurantId" element={<NewRestaurant />} />
              <Route path=":id" element={<Details from="restaurants" />} />
            </Route>
          </Route>
        )}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Flex>
  );
};

export default Content;
