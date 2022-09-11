import { Button } from "@chakra-ui/react";

const CustomButton = ({ name, ...props }) => {
  return (
    <Button {...props} colorScheme="teal">
      {name}
    </Button>
  );
};

export default CustomButton;
