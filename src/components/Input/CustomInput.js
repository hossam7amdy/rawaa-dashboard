import {
  Input,
  FormLabel,
  InputGroup,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import { useField } from "formik";

const CustomInput = ({ label, leftElement, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel>{label || props.name}</FormLabel>
      <InputGroup>
        {leftElement}
        <Input {...props} {...field} />
      </InputGroup>
      {meta.touched && meta.error && (
        <FormHelperText color="red">{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomInput;
