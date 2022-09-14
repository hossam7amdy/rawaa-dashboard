import {
  Image,
  Heading,
  VStack,
  Text,
  FormControl,
  FormLabel,
  Select,
  Spacer,
  Flex,
} from "@chakra-ui/react";

import { GRAY_COLOR } from "../../lib/helpers";
import CustomButton from "../../components/UI/CustomButton";
import QuantityButton from "../../components/Input/QuantityButton";

const ProductDetails = () => {
  return (
    <Flex h="85vh" w="90%" align="start" justify="space-around" p={5}>
      <VStack align="start" spacing={6}>
        <Text
          fontWeight="semibold"
          textTransform="uppercase"
          color={GRAY_COLOR}
        >
          Pizza
        </Text>
        <Heading marginBottom={6}>Pepperoni</Heading>

        <Text fontSize="md" fontWeight="semibold">
          $23.00
        </Text>

        <VStack w="100%" align="start" spacing={-2}>
          <FormLabel fontSize={12}>Size</FormLabel>
          <FormControl>
            <Select>
              <option value={1}>Small</option>
              <option value={2}>Medium</option>
              <option value={3}>Large</option>
            </Select>
          </FormControl>
        </VStack>

        <VStack align="start" spacing={-2}>
          <FormLabel fontSize={12}>Quantity</FormLabel>
          <QuantityButton defaultValue={1} min={1} max={15} />
        </VStack>
        <Spacer />
        <CustomButton type="click" name="Add to cart" w="100%" />
      </VStack>

      <Image
        fallbackSrc="https://via.placeholder.com/150"
        alt="breakfast meal"
        src="https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
        boxSize="400px"
        shadow="lg"
        rounded="lg"
      />
    </Flex>
  );
};

export default ProductDetails;
