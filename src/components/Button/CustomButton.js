import { Button } from "@chakra-ui/react";

const CustomButton = ({ name, ...props }) => {
  return <Button {...props}>{name}</Button>;
};

export default CustomButton;
