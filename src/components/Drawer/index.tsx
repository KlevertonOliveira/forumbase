import { FC } from "react";
import { useDisclosure, Button, Drawer as ChakraDrawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Box, FormControl, Text, DrawerFooter, Icon, VStack, FormLabel, useColorModeValue, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { RiFileAddFill } from 'react-icons/ri';
import { createPostValidationSchema } from '../../helpers/createPostValidationSchema';
import { createPostForm } from '../../types/CreatePostForm';
import Input from '../Input';
import Select from '../Select';
import Textarea from '../Textarea';
import { categories } from '../../data/categories';

const Drawer: FC = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleSubmit({ title, content, category }: createPostForm) {
    console.log(`${title}, ${content}, ${category}`);
    toast({
      title: 'Success!',
      description: "Your post was successfully created!",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    onClose();
  }

  /* Special styles (for light/dark mode) */

  const ctaButtonBg = useColorModeValue('orange.400', 'orange.500');
  const ctaButtonHover = useColorModeValue("orange.500", "orange.400");
  const contentBodyBg = useColorModeValue('#E9F2DA', 'gray.900');
  const cancelButtonBg = useColorModeValue('mainGray', 'gray.600');

  return (
    <>
      <Button
        bg={ctaButtonBg}
        _hover={{ backgroundColor: ctaButtonHover }}
        _active={{ backgroundColor: ctaButtonBg }}
        color='white'
        rounded={{ base: 'full', sm: 'lg' }}
        title='Create Post'
        h={'min-content'}
        w={'min-content'}
        py={{ base: 3, sm: 3 }}
        px={{ base: 3, md: 7 }}
        disabled={false}
        onClick={onOpen}
      >
        <Icon as={RiFileAddFill} h={6} w={6} mr={{ base: 0, sm: 1 }} />
        <Box display={{ base: 'none', sm: 'inline' }}>
          Create Post
        </Box>
      </Button>

      <ChakraDrawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        size='lg'
      >
        <Formik
          initialValues={{ title: '', category: '', content: '' }}
          validationSchema={createPostValidationSchema}
          onSubmit={handleSubmit}
        >
          {
            () => (
              <Form>
                <DrawerOverlay />

                <DrawerContent>

                  <DrawerCloseButton />

                  <DrawerHeader borderBottomWidth='1px'>
                    Start a new discussion
                  </DrawerHeader>

                  <DrawerBody bg={contentBodyBg}>

                    <VStack spacing={3}>

                      <FormControl>
                        <FormLabel htmlFor='title'>
                          Title
                          <Text display={'inline'} text='sm' color={'red.500'}>*</Text>
                        </FormLabel>
                        <Input name='title' type='text' placeholder='Post Title' icon='info' />
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor='category'>
                          Category
                          <Text display={'inline'} text='sm' color={'red.500'}>*</Text>
                        </FormLabel>
                        <Select name='category'>
                          <option value="">Select a category</option>
                          {
                            categories.map(category =>
                              <option key={category.title} value={category.title}>{category.title}</option>
                            )
                          }
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor='content'>
                          Content
                          <Text display={'inline'} text='sm' color={'red.500'}>*</Text>
                        </FormLabel>
                        <Textarea name='content' placeholder='Post Content' />
                      </FormControl>

                    </VStack>
                  </DrawerBody>

                  <DrawerFooter borderTopWidth='1px'>
                    <Button mr={3} bg={cancelButtonBg} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      type='submit'
                      bg={ctaButtonBg}
                      _hover={{ backgroundColor: ctaButtonHover }}
                      _active={{ backgroundColor: ctaButtonBg }}
                      color='white'
                    >
                      Submit
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Form>
            )
          }
        </Formik>

      </ChakraDrawer>
    </>
  );
};

export default Drawer;