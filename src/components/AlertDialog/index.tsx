import { Button, AlertDialog as ChakraAlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import React from 'react';

type AlertDialogProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  deleteInteractiveArea: () => void;
};

const AlertDialog: React.FC<AlertDialogProps> = ({ title, deleteInteractiveArea, isOpen, onClose }) => {

  return (
    <>
      <ChakraAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={undefined}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button variant='secondary' onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant='primary'
                ml={3}
                onClick={deleteInteractiveArea}
              >
                Yes, delete it
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </ChakraAlertDialog>
    </>
  );
};

export default AlertDialog;