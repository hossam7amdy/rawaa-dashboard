import {
  Text,
  Flex,
  Input,
  FormLabel,
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
import { getIconByName } from "../../lib/IconStore";

const InputFile = ({ label, error, ...props }) => {
  return (
    <FormControl>
      <FormLabel cursor="pointer">
        {
          <Flex gap={2}>
            <Text>{label || props.name}</Text>
            {getIconByName("image", { h: 6, w: 6 })}
          </Flex>
        }
      </FormLabel>
      <Input type="file" {...props} />
      {error && <FormHelperText color="red">{error}</FormHelperText>}
    </FormControl>
  );
};

export default InputFile;
