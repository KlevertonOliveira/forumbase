import { FC } from 'react';
import { Button, Modal as ChakraModal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text } from '@chakra-ui/react';

type ModalProps = {
    title: string;
    content: string;
    isOpen: boolean;
    onClose: () => void;
}

const Modal: FC<ModalProps> = ({ title, content, isOpen, onClose }) => {

  return (
    <>
      {/* <Button onClick={onOpen}>Trigger modal</Button> */}

      <ChakraModal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{content}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  )
}

export default Modal
