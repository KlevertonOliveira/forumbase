import { FC } from "react";
import { useDisclosure, Button, Drawer as ChakraDrawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Box, FormControl, Text, DrawerFooter, Icon, VStack, FormLabel, useColorModeValue, useToast, Tooltip } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { RiFileAddFill } from 'react-icons/ri';
import { createPostValidationSchema } from '../../helpers/validation/createPostValidationSchema';
import { createPostForm } from '../../types/CreatePostForm';
import CustomInput from '../CustomInput';
import CustomSelect from '../CustomSelect';
import CustomTextarea from '../CustomTextarea';
import { categories } from '../../data/categories';
import { useAuth } from '../../hooks/useAuth';
import { TPost } from '../../types/TPost';
import { addPost } from '../../services/realtimeDatabase';
import { capitalizeWord } from '../../helpers/other/capitalizeWord';

const CreatePostDrawer: FC = () => {

  const { currentUser } = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleSubmit({ title, content, category }: createPostForm) {

    let feedbackType: 'success' | 'error';
    let feedbackContent: string;

    const newPost: TPost = {
      title,
      content,
      category,
      createdAt: new Date().getTime(),
      creatorId: currentUser!.uid,
      creatorEmail: currentUser!.email!,
      creatorPhotoURL: currentUser!.photoURL
    };

    try {
      await addPost(newPost);
      feedbackType = 'success';
      feedbackContent = 'Your post has been successfully created!';
    }

    catch (error) {
      console.log(error);
      feedbackType = 'error';
      feedbackContent = 'An error has ocurred. Please, try again.';
    }

    toast({
      title: capitalizeWord(feedbackType),
      description: feedbackContent,
      status: feedbackType,
      duration: 5000,
      isClosable: true,
    });
    onClose();
  }

  /* Special styles (for light/dark mode) */

  const contentBodyBg = useColorModeValue('mainGray.200', 'gray.900');

  return (
    <>
      <Tooltip label='Start a discussion'>
        <Button
          variant='primary'
          rounded={{ base: 'full', sm: 'lg' }}
          h={'min-content'}
          w={'min-content'}
          py={{ base: 3, sm: 3 }}
          px={{ base: 3, md: 7 }}
          disabled={!currentUser}
          onClick={onOpen}
        >
          <Icon as={RiFileAddFill} h={6} w={6} mr={{ base: 0, sm: 1 }} />
          <Box display={{ base: 'none', sm: 'inline' }}>
            Create Post
          </Box>
        </Button>
      </Tooltip>

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
                        <CustomInput name='title' type='text' placeholder='Post Title' icon='info' />
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor='category'>
                          Category
                          <Text display={'inline'} text='sm' color={'red.500'}>*</Text>
                        </FormLabel>
                        <CustomSelect name='category'>
                          <option value="">Select a category</option>
                          {
                            categories.map(category =>
                              <option key={category.title} value={category.title}>{category.title}</option>
                            )
                          }
                        </CustomSelect>
                      </FormControl>

                      <FormControl>
                        <FormLabel htmlFor='content'>
                          Content
                          <Text display={'inline'} text='sm' color={'red.500'}>*</Text>
                        </FormLabel>
                        <CustomTextarea name='content' placeholder='Post Content' />
                      </FormControl>

                    </VStack>
                  </DrawerBody>

                  <DrawerFooter borderTopWidth='1px'>
                    <Button mr={3} variant='secondary' onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type='submit' variant='primary'>Submit</Button>
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

export default CreatePostDrawer;