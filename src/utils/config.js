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
  FILE: "https://www.rawaa.somee.com/api/file/",
});

// sidebar link names
export const SIDEBAR_LIST = Object.freeze([
  "Orders",
  "Products",
  "Categories",
  "Staff",
  "Restaurants",
]);

// helpers
export const CURRENCY_FORMATER = (amount) => {
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
  }).format(amount);
};

export const DATE_FORMATER = (date) => {
  const options = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const dateFormat = new Date(date);
  return new Intl.DateTimeFormat("en-EG", options).format(dateFormat);
};
