import { AddIcon, InfoIcon } from '@chakra-ui/icons';
import { useDisclosure, Button, Drawer as ChakraDrawer, Input, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Stack, Box, FormControl, FormLabel, InputGroup, InputLeftElement, Select, Textarea, DrawerFooter } from '@chakra-ui/react';
import { FC, useRef } from "react";

const Drawer: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={onOpen}>
        Create Post
      </Button>
      <ChakraDrawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size='lg'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Start a new discussion
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <FormControl>
                  <FormLabel htmlFor='username'>Post Title</FormLabel>
                  <InputGroup>
                    <InputLeftElement>
                      <InfoIcon />
                    </InputLeftElement>
                    <Input
                      varint='filled'
                      id='username'
                      placeholder='Please enter a post title'
                      _placeholder={{ color: 'gray.800' }}
                    />
                  </InputGroup>
                </FormControl>
              </Box>

              <Box>
                <FormLabel htmlFor='owner'>Category</FormLabel>
                <Select id='owner' defaultValue='segun' variant='filled'>
                  <option value='segun'>HTML</option>
                  <option value='kola'>CSS</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor='desc'>Content</FormLabel>
                <Textarea id='desc' bg={'gray.50'} />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </ChakraDrawer>
    </>
  );
};

export default Drawer;