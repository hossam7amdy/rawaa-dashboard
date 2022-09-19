import {
  Input,
  FormLabel,
  InputGroup,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

const CustomInput = ({ label, leftElement, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel>{label || props.name}</FormLabel>
      <InputGroup>
        {leftElement}
        <Input as={Field} {...props} {...field} />
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomInput;
