export const BASE_URL = "http://www.rawaa.somee.com";
export const TIMEOUT_SEC = 5;
export const MAX_FILE_SIZE = 1000000; // 1MB
export const LIGHT_GRAY = Object.freeze(["gray.100", "gray.700"]);
export const GRAY_COLOR = Object.freeze(["gray.400", "gray.500"]);
export const SUPPORTED_FORMATS = Object.freeze([
  "image/jpg",
  "image/jpeg",
  "image/png",
]);
export const SIDEBAR_LIST = Object.freeze([
  "Customers",
  "Orders",
  "Staff",
  "Categories",
  "Products",
  "Restaurants",
]);
export const SUCCESS_TOAST = Object.freeze({
  title: "Success",
  description: "Request completed successfully.",
  status: "success",
  duration: 5000,
  isClosable: true,
  position: "top",
});
export const FAILED_TOAST = Object.freeze({
  title: "Failed",
  description: "Error Occurred. Try again!",
  status: "fail",
  duration: 5000,
  isClosable: true,
  position: "top",
});

// TODO
export const Endpoints = Object.freeze({});
/*
POST
​/{lang}​/api​/cp​/Category

​/{lang}​/api​/cp​/Product


GET
​/{lang}​/api​/cp​/Category​/{id}

PUT
​/{lang}​/api​/cp​/Category​/{id}

DELETE
​/{lang}​/api​/cp​/Category​/{id}

GET
​/{lang}​/api​/cp​/Category​/all

GET
​/{lang}​/api​/cp​/Category​/Search​/{text}

POST

GET
​/{lang}​/api​/cp​/Product​/{id}

PUT
​/{lang}​/api​/cp​/Product​/{id}

DELETE
​/{lang}​/api​/cp​/Product​/{id}

GET
​/{lang}​/api​/cp​/Product​/all

GET
​/{lang}​/api​/cp​/Product​/Search​/{text}
*/
