import {
  Text,
  Flex,
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import { getIconByName } from "../../lib/IconStore";

const InputFile = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const { value, ...rest } = field;

  return (
    <FormControl>
      <FormLabel cursor="pointer" maxW="min-content">
        {
          <Flex gap={2}>
            <Text>{label || props.name}</Text>
            {getIconByName("image", { h: 6, w: 6 })}
          </Flex>
        }
      </FormLabel>
      <Field as={Input} type="file" value={undefined} {...rest} {...props} />
      {meta.error && <FormHelperText color="red">{meta.error}</FormHelperText>}
    </FormControl>
  );
};

export default InputFile;
