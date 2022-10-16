import React, { Suspense, useContext } from "react";
import { Flex, Skeleton } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

import { AuthContext } from "../../context/auth";

const Restaurants = React.lazy(() =>
  import("../../pages/Restaurants/Restaurants")
);
const Categories = React.lazy(() =>
  import("../../pages/Categories/Categories")
);
const NewRestaurant = React.lazy(() => import("../../pages/Restaurants/New"));
const NewCategory = React.lazy(() => import("../../pages/Categories/New"));
const NewProduct = React.lazy(() => import("../../pages/Products/New"));
const NewStaff = React.lazy(() => import("../../pages/Staff/New"));
const NotFound = React.lazy(() => import("../../pages/NotFound"));
const Products = React.lazy(() => import("../../pages/Products/Products"));
const Details = React.lazy(() => import("../../pages/Details"));
const Orders = React.lazy(() => import("../../pages/Orders/Orders"));
const Login = React.lazy(() => import("../../pages/Login"));
const Staff = React.lazy(() => import("../../pages/Staff/Staff"));
const Home = React.lazy(() => import("../../pages/Home"));

const Main = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Flex as="main" p={2} flexGrow={1}>
      <Suspense fallback={<Skeleton />}>
        <Routes>
          {!isLoggedIn && <Route path="/" element={<Login />} />}
          {isLoggedIn && (
            <Route path="/">
              <Route index element={<Home />} />
              <Route path=":id" element={<Details from="staff" />} />
              <Route path="orders">
                <Route index element={<Orders />} />
                <Route path=":id" element={<Details from="order" />} />
              </Route>
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
      </Suspense>
    </Flex>
  );
};

export default Main;
