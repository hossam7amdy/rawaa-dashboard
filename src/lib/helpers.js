export const TIMEOUT_SEC = 5;
export const LIGHT_GRAY = Object.freeze(["gray.100", "gray.700"]);
export const GRAY_COLOR = Object.freeze(["gray.400", "gray.500"]);
export const IMAGE_PREVIEW =
  "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";

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
