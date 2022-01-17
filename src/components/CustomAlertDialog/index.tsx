import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import React from 'react';

type CustomAlertDialogProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  deleteInteractiveArea: () => void;
};

const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({ title, deleteInteractiveArea, isOpen, onClose }) => {

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={undefined}
      >
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
      </AlertDialog>
    </>
  );
};

export default CustomAlertDialog;