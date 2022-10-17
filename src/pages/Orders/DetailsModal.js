import { List, Flex, Text, Button, ListItem } from "@chakra-ui/react";

import { Modal } from "../../components/Modal/Modal";

export const DetailsModal = ({ isOpen, onClose, modalData }) => {
  const { header, data } = modalData;
  const ignore = [
    "id",
    "isDeleted",
    "customerId",
    "emailVerification",
    "orderNumber",
    "createOn",
    "updateOn",
  ];

  let body = [];
  for (const key in data) {
    if (ignore.includes(key)) continue;
    body.push(
      <ListItem key={key}>
        <Flex gap={2}>
          <Text as="b">{key}: </Text>
          <Text as="kbd">{String(data[key])}</Text>
        </Flex>
      </ListItem>
    );
  }

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
      body={<List>{body}</List>}
      footer={footer}
    />
  );
};
