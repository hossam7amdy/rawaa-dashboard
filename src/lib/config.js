export const TIMEOUT_SEC = 30;
export const LIGHT_GRAY = Object.freeze(["gray.100", "gray.700"]);
export const GRAY_COLOR = Object.freeze(["gray.400", "gray.500"]);

export const SIDEBAR_LIST = Object.freeze([
  "Orders",
  "Products",
  "Categories",
  "Staff",
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
export const PENDING_TOAST = Object.freeze({
  title: "Pending",
  description:
    "Request is processing in the background, will inform you once it is done.",
  status: "info",
  duration: 5000,
  isClosable: true,
  position: "top",
});
export const FAILED_TOAST = Object.freeze({
  title: "Failed",
  description: "Error Occurred. Try again!",
  status: "error",
  duration: 5000,
  isClosable: true,
  position: "top",
});
