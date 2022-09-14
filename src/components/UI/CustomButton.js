import { Button, Spinner } from "@chakra-ui/react";

const CustomButton = ({ name, ...props }) => {
  return <Button {...props}>{name ? name : <Spinner />}</Button>;
};

export default CustomButton;
