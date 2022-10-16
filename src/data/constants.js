export const LIGHT_GRAY = Object.freeze(["gray.100", "gray.700"]);
export const GRAY_COLOR = Object.freeze(["gray.400", "gray.500"]);

// db pathes
export const PATH = Object.freeze({
  STAFF: "/en/api/cp/staff",
  ORDER: "/en/api/cp/order",
  PRODUCT: "/en/api/cp/product",
  CATEGORY: "/en/api/cp/category",
  RESTAURANT: "/en/api/cp/restaurant",
  STATS: "/ar/api/cp/Order/totalPrice",
  ADDRESS: "api/client/deliveryaddress",
  FILE: "https://www.rawaa.some.com/api/file/",
});

// sidebar link names
export const SIDEBAR_LIST = Object.freeze([
  "Orders",
  "Products",
  "Categories",
  "Staff",
  "Restaurants",
]);

export const ORDER_STATES = [
  { key: 1, value: "Pending" },
  { key: 2, value: "Processing" },
  { key: 3, value: "Rejected" },
  { key: 4, value: "Completed" },
  { key: 5, value: "Canceled" },
];

export const SCROLLBAR_STYLE = {
  "&::-webkit-scrollbar": {
    w: 2,
  },
  "&::-webkit-scrollbar-track": {
    w: 6,
    bg: "gray.200",
    rounded: "md",
  },
  "&::-webkit-scrollbar-thumb": {
    rounded: "md",
    bg: "gray.400",
  },
};
