import { useField } from "formik";
import {
  Input,
  InputGroup,
  FormControl,
  FormLabel,
  Text,
  Flex,
} from "@chakra-ui/react";

const CustomInput = (props) => {
  const { label, leftElement, rightElement, ...rest } = props;
  const [field, meta] = useField(rest);

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel>{label || rest.id || rest.name}</FormLabel>
      <InputGroup>
        {leftElement}
        <Input {...rest} {...field} />
        {rightElement}
      </InputGroup>
      {meta.touched && meta.error && <Text color="red">{meta.error}</Text>}
    </FormControl>
  );
};

export default CustomInput;
