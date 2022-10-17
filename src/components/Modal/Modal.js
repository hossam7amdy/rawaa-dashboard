import {
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Modal as ChakraModal,
} from "@chakra-ui/react";

import { SCROLLBAR_STYLE } from "../../data/constants";

export const Modal = (props) => {
  const { isOpen, onClose, header, body, footer, ...rest } = props;

  return (
    <ChakraModal
      size="2xl"
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      {...rest}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody sx={SCROLLBAR_STYLE}>{body}</ModalBody>

        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
