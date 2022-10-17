import {
  List,
  Flex,
  Text,
  Button,
  VStack,
  Divider,
  Heading,
} from "@chakra-ui/react";

import { CURRENCY_FORMATER } from "../../utils/helpers";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import PreviewImage from "../../components/UI/PreviewImage";
import useQueryById from "../../hooks/useQueryById";
import { Modal } from "../../components/Modal/Modal";
import { PATH } from "../../data/constants";

export const OrderContentModal = ({ isOpen, onClose, orderId }) => {
  const { isLoading, data: orderData } = useQueryById({
    key: "order",
    id: orderId,
  });

  const header = "Order Details";

  const price = new Map([
    [1, "smallSizePrice"],
    [2, "mediumSizePrice"],
    [3, "bigSizePrice"],
  ]);
  const tasteMap = new Map([
    [1, "normal"],
    [2, "spicy"],
  ]);
  const sizeMap = new Map([
    [1, "small"],
    [2, "medium"],
    [3, "large"],
  ]);

  let totalAmount = 0;

  const bodyData = orderData?.map((item, idx) => {
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
          <PreviewImage src={PATH.FILE + item.product.image} boxSize={14} />
        </Flex>
        <Flex w="full" justify="space-between">
          <Text as="kbd">Price</Text>
          <Text as="b">{CURRENCY_FORMATER(cost)}</Text>
        </Flex>

        <Divider />
      </VStack>
    );
  });

  const body = (
    <>
      <List>{bodyData}</List>
      <Flex justify="space-between">
        <Text as="b">Total Amount</Text>
        <Heading size="md">{CURRENCY_FORMATER(totalAmount)}</Heading>
      </Flex>
    </>
  );

  const footer = (
    <Button mr={3} onClick={onClose}>
      Close
    </Button>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={header}
      footer={footer}
      body={isLoading ? <LoadingSpinner /> : body}
    />
  );
};
