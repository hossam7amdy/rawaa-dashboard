export const TIMEOUT_SEC = 30;
export const LIGHT_GRAY = Object.freeze(["gray.100", "gray.700"]);
export const GRAY_COLOR = Object.freeze(["gray.400", "gray.500"]);

// db pathes
export const PATH = Object.freeze({
  STAFF: "/en/api/cp/staff",
  ORDER: "/en/api/cp/order",
  PRODUCT: "/en/api/cp/product",
  CUSTOMER: "/en/api/cp/customers",
  CATEGORY: "/en/api/cp/category",
  RESTAURANT: "/en/api/cp/restaurant",
  FILE: "http://www.rawaa.somee.com/api/file/",
});

// sidebar link names
export const SIDEBAR_LIST = Object.freeze([
  "Orders",
  "Products",
  "Categories",
  "Staff",
  "Restaurants",
]);

// toasts
export const SUCCESS_TOAST = Object.freeze({
  title: "Success",
  description: "Request completed successfully.",
  status: "success",
  duration: 5000,
  isClosable: true,
  position: "top",
});
export const PENDING_TOAST = Object.freeze({
  title: "Pending",
  description: "Request is processing in the background, will inform you soon.",
  status: "info",
  duration: 5000,
  isClosable: true,
  position: "top",
});
