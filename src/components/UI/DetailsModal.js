import {
  List,
  Flex,
  Text,
  Modal,
  Button,
  ListItem,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from "@chakra-ui/react";

export const DetailsModal = ({ isOpen, onClose, modalData }) => {
  const { header, data } = modalData;
  console.log(modalData);
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="bold">{header}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List>{body}</List>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
