import { useField } from "formik";
import { FormControl, FormLabel, Text, Select } from "@chakra-ui/react";

const Selection = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel>{label || props.id || props.name}</FormLabel>
      <Select {...field} {...props} />
      {meta.touched && meta.error && <Text color="red">{meta.error}</Text>}
    </FormControl>
  );
};

export default Selection;
