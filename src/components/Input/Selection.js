import {
  Select,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

const Selection = ({ options, label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && meta.error} isRequired>
      <FormLabel>{label || props.name}</FormLabel>
      <Field
        as={Select}
        {...field}
        {...props}
        validate={(value) => (!value ? "Required" : undefined)}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.titleEn}
          </option>
        ))}
      </Field>
      {meta.touched && meta.error && (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default Selection;
