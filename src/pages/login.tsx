import React from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';

import Input from '../components/Input';
import { Image, Box, Button, FormControl, Heading, Text, Link, useColorModeValue, VStack, Flex, useBreakpointValue, HStack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import { FcGoogle } from 'react-icons/fc';

import { signInValidationSchema } from '../helpers/signInValidationSchema';
import { LoginForm } from '../types/LoginForm';

import MenuButton from '../components/MenuButton';

const Login: NextPage = () => {

  const submitButtonBg = useColorModeValue('orange.400', 'orange.500');
  const submitButtonHoverBg = useColorModeValue('orange.500', 'orange.400');

  function handleSubmit({ email, password }: LoginForm) {
    alert(`${email}, ${password}`);
  }

  return (
    <Flex
      as='main'
      minH='100vh'
    >
      <Head>
        <title>ForumBase | Log In</title>
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
        >
          <Image
            src='/images/discussion-board.svg'
            alt='Illustration of a man near a online discussion board'
            boxSize='full'
            bg={'white'}
            p={4}
            maxH={{ base: '50vh', lg: '100vh' }}
          />
        </Box>

        {/* Form Section */}
        <Flex
          as='section'
          flex={{ base: 1, lg: 5 }}
          bg={useColorModeValue('gray.200', 'transparent')}
          direction={'column'}
          justifyContent={'space-between'}
          py={1}
          pb={8}
          gap={{ base: 12, lg: 0 }}
        >

          <MenuButton />

          <Box>
            <VStack spacing={{ base: 6, sm: 7, lg: 8 }} mx='auto' w={{ base: '90%', lg: '90%' }}>
              <Heading
                as='h1'
                size={useBreakpointValue({ base: 'lg', sm: 'xl', lg: 'lg', xl: 'xl' })}
              >
                Log in to Your Account
              </Heading>

              <Box w='90%' maxW='30rem'>
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={signInValidationSchema}
                  onSubmit={handleSubmit}
                >
                  {
                    () => (
                      <Form>
                        <FormControl>
                          <Input name='email' type='email' placeholder='Email' icon='email' />
                        </FormControl>

                        <FormControl mt={3}>
                          <Input name='password' type='password' placeholder='Password' icon='password' />
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
                          Sign In
                        </Button>
                      </Form>
                    )
                  }
                </Formik>
              </Box>

              <Text fontSize='sm' fontWeight='medium'>
                Don&apos;t have an account? {" "}
                <NextLink href='/signup' passHref>
                  <Link
                    color={useColorModeValue('orange.400', 'orange.500')}
                    _hover={{
                      color: useColorModeValue("orange.500", "orange.400"),
                    }}
                    fontWeight={'semibold'}
                  >
                    Sign Up
                  </Link>
                </NextLink>
              </Text>
            </VStack>
          </Box>

          <HStack justifyContent='center' spacing={4}>
            <Text>
              Or
            </Text>
            <Button
              aria-label='Sign in with Google account'
              bg='black'
              _hover={{
                backgroundColor: '#191919',
                transitionProperty: 'backgroundColor',
                msTransitionDuration: '200',
                transitionTimingFunction: 'ease-in'
              }}
              type='button'
            >
              <FcGoogle />
              <Text ml='2' color='white'>Sign in with Google</Text>
            </Button>
          </HStack>

        </Flex>
      </Flex>
    </Flex >
  );
};

export default Login;
