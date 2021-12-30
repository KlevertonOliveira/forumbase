import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import Input from '../components/Input';
import { Formik, Form } from 'formik';
import { Image, Box, Button, FormControl, Heading, useColorModeValue, VStack, Flex, useBreakpointValue, Grid, FormLabel, Text } from '@chakra-ui/react';

import Textarea from '../components/Textarea';
import { createPostValidationSchema } from '../helpers/createPostValidationSchema';
import { createPostForm } from '../types/CreatePostForm';
import MenuButton from '../components/MenuButton';
import Select from '../components/Select';
import { categories } from '../data/categories';

const Login: NextPage = () => {

  const submitButtonBg = useColorModeValue('orange.400', 'orange.500');
  const submitButtonHoverBg = useColorModeValue('orange.500', 'orange.400');

  function handleSubmit({ title, content, category }: createPostForm) {
    alert(`${title}, ${content}, ${category}`);
  }

  return (
    <Flex
      as='main'
      minH='100vh'
    >
      <Head>
        <title>ForumBase | Create Post</title>
      </Head>

      <Flex
        as='section'
        direction={{ base: 'column', lg: 'row' }}
        flex={1}
      >
        {/* Image Section */}
        <Box
          as='section'
          flex={{ base: 1, lg: 7 }}
          bg='white'
        >
          <Image
            src='/images/new-post.svg'
            alt='Group of people brainstorming'
            bg='white'
            p={4}
            boxSize='full'
            maxH={{ base: '50vh', lg: '100vh' }}
          />
        </Box>

        {/* Form Section */}
        <Flex
          as='section'
          flex={{ base: 1, lg: 5 }}
          bg={useColorModeValue('gray.200', 'transparent')}
          direction={'column'}
          gap={{ base: 10, lg: 20 }}
          pb={10}
        >

          <MenuButton />

          <VStack spacing={10}>
              <Heading
                as='h1'
                size={useBreakpointValue({ base: 'lg', sm: 'xl', lg: 'lg', xl: 'xl' })}
              >
                Start a Discussion
              </Heading>

              <Box w='90%' maxW='30rem'>
                <Formik
                initialValues={{ title: '', category: '', content: '' }}
                  validationSchema={createPostValidationSchema}
                  onSubmit={handleSubmit}
                >
                  {
                    () => (
                      <Form>
                        <VStack spacing={3}>
                          <FormControl>
                            {/* <FormLabel htmlFor='title'>
                              Title {" "}
                              <Text display={'inline'} text='sm' color={'red.500'}>*</Text>
                            </FormLabel> */}
                            <Input name='title' type='text' placeholder='Post Title' icon='info' />
                          </FormControl>

                          <FormControl>
                            {/*  <FormLabel htmlFor='category'>
                              Category {" "}
                              <Text display={'inline'} text='sm' color={'red.500'}>*</Text>
                            </FormLabel> */}
                            <Select name='category'>
                              <option value="">Select a category</option>
                              {
                                categories.map(category =>
                                  <option key={category} value={category}>{category}</option>
                                )
                              }
                            </Select>
                          </FormControl>

                          <FormControl>
                            {/* <FormLabel htmlFor='content'>
                              Content {" "}
                              <Text display={'inline'} text='sm' color={'red.500'}>*</Text>
                            </FormLabel> */}
                            <Textarea name='content' placeholder='Post Content' />
                          </FormControl>
                        </VStack>

                        <Button
                          aria-label='Submit Form'
                          w='full'
                          mt={4}
                          bg={submitButtonBg}
                          colorScheme='orange'
                          color='white'
                          _hover={{
                            background: submitButtonHoverBg,
                          }}
                          type='submit'
                        >
                          Create Post
                        </Button>
                      </Form>
                    )
                  }
                </Formik>
              </Box>
          </VStack>
        </Flex>
      </Flex>
    </Flex >
  );
};

export default Login;
