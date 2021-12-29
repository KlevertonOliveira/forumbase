import React from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';

import Input from '../components/Input';
import { Formik, Form } from 'formik';
import { Image, Box, Button, FormControl, Heading, useColorModeValue, VStack, useColorMode, Flex, useBreakpointValue, Grid, FormLabel, Text } from '@chakra-ui/react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import Textarea from '../components/Textarea';
import { createPostValidationSchema } from '../helpers/createPostValidationSchema';
import { createPostForm } from '../types/CreatePostForm';
import NavigationButtons from '../components/NavigationButtons';

const Login: NextPage = () => {

  const { toggleColorMode, colorMode } = useColorMode();

  const submitButtonBg = useColorModeValue('orange.400', 'orange.500');
  const submitButtonHoverBg = useColorModeValue('orange.500', 'orange.400');

  function handleSubmit(data: createPostForm) {
    alert(`${data.title}, ${data.content}`);
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
          borderRight={'1px solid'}
          borderColor={'gray.300'}
        >
          <Image
            src='/images/c1.jpg'
            alt='Group of people brainstorming'
            boxSize='full'
            loading='eager'
            maxH={{ base: '50vh', lg: 'full' }}
          />
        </Box>

        {/* Form Section */}
        <Flex
          as='section'
          flex={{ base: 1, lg: 5 }}
          bg={useColorModeValue('white', 'transparent')}
          direction={'column'}
          justifyContent={'space-between'}
          py={1}
          pb={4}
          gap={{ base: 12, lg: 0 }}
        >

          <NavigationButtons />

          <Grid h='full' placeItems='center'>
            <VStack spacing={{ base: 6, sm: 7, lg: 8 }} mx='auto' w={{ base: '90%', lg: '90%' }}>
              <Heading
                as='h1'
                size={useBreakpointValue({ base: 'lg', sm: 'xl', lg: 'lg', xl: 'xl' })}
              >
                Start a Discussion
              </Heading>
              <Box w='90%' maxW='30rem'>
                <Formik
                  initialValues={{ title: '', content: '' }}
                  validationSchema={createPostValidationSchema}
                  onSubmit={handleSubmit}
                >
                  {
                    () => (
                      <Form>
                        <FormControl>
                          <FormLabel htmlFor='title'>
                            Title {" "}
                            <Text display={'inline'} text='sm' color={'red.500'}>*</Text>
                          </FormLabel>
                          <Input name='title' type='text' placeholder='Post Title' icon='info' />
                        </FormControl>
                        <FormControl mt={3}>
                          <FormLabel htmlFor='content'>
                            Content {" "}
                            <Text display={'inline'} text='sm' color={'red.500'}>*</Text>
                          </FormLabel>
                          <Textarea name='content' placeholder='Post Content' />
                        </FormControl>
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
          </Grid>
        </Flex>
      </Flex>
    </Flex >
  );
};

export default Login;
