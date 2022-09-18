import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogContent,
} from "@chakra-ui/react";
import { useRef } from "react";

const DeleteModal = (props) => {
  const cancelRef = useRef();
  const { header, isOpen, onClose, onDelete } = props;

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            {/* For it to work, it needs to use forwardRef at CustomButton component */}
            {/* <CustomButton name="Cancel" ref={cancelRef} onClick={onClose} /> */}

            <Button ref={cancelRef} onClick={onClose} ml={3}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onClose();
                onDelete();
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteModal;
