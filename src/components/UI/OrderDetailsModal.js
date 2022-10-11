import {
  List,
  Flex,
  Text,
  Modal,
  Image,
  Button,
  VStack,
  Divider,
  Heading,
  Skeleton,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from "@chakra-ui/react";

import useQueryById from "../../hooks/useQueryById";
import { CURRENCY_FORMATER, PATH } from "../../utils/config";

export const OrderDetailsModal = ({ isOpen, onClose, orderId }) => {
  const { isLoading, data: orderData } = useQueryById({
    key: "order",
    id: orderId,
  });

  const price = new Map([
    [1, "smallSizePrice"],
    [2, "mediumSizePrice"],
    [3, "bigSizePrice"],
  ]);
  const tasteMap = new Map([
    [1, "normal"],
    [2, "spicy"],
    [3, "mix"],
  ]);
  const sizeMap = new Map([
    [1, "small"],
    [2, "medium"],
    [3, "large"],
  ]);

  let totalAmount = 0;

  const body = orderData?.map((item, idx) => {
    const cost = item.product[price.get(item.size)] * item.quantity;
    totalAmount += cost;

    return (
      <VStack key={idx} align="start" my={5}>
        <Flex w="full" justify="space-between">
          <VStack align="start">
            <Flex gap={2}>
              <Text as="em">{item.product.title}</Text>
              <Text as="b" fontStyle="italic">
                x{item.quantity}
              </Text>
            </Flex>
            <Text as="kbd">Size: {sizeMap.get(item.size)}</Text>
            <Text as="kbd">Taste: {tasteMap.get(item.taste)}</Text>
          </VStack>
          <Image boxSize={14} src={PATH.FILE + item.product.image} />
        </Flex>
        <Flex w="full" justify="space-between">
          <Text as="kbd">Price</Text>
          <Text as="b">{CURRENCY_FORMATER(cost)}</Text>
        </Flex>

        <Divider />
      </VStack>
    );
  });

  return (
    <Skeleton isLoaded={!isLoading}>
      <Modal size="xl" overflowX="auto" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="bold">Order Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List>{body}</List>
            <Flex justify="space-between">
              <Text as="b">Total Amount</Text>
              <Heading size="md">{CURRENCY_FORMATER(totalAmount)}</Heading>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Skeleton>
  );
};
