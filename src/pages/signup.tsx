import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';

import Input from '../components/Input';
import { Formik, Form } from 'formik';
import { Image, Box, Button, FormControl, Heading, Text, Link, useColorModeValue, VStack, useColorMode, Flex, useBreakpointValue, HStack } from '@chakra-ui/react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';

import { SignUpForm } from '../types/SignUpForm';
import { signUpValidationSchema } from '../helpers/signUpValidationSchema';
import NavigationButtons from '../components/NavigationButtons';

const SignUp: NextPage = () => {

  const { toggleColorMode, colorMode } = useColorMode();

  const submitButtonBg = useColorModeValue('orange.400', 'orange.500');
  const submitButtonHoverBg = useColorModeValue('orange.500', 'orange.400');

  function handleSubmit(data: SignUpForm) {
    alert(data.email);
  }

  return (
    <Flex
      as='main'
      minH='100vh'
    >
      <Head>
        <title>ForumBase | Sign Up</title>
      </Head>

      <Flex
        as='section'
        direction={{ base: 'column', lg: 'row' }}
        flex={1}
      >
        {/* Image Section */}
        <Box
          as='section'
          flex={{ base: 1, lg: 6 }}
          borderLeft={'1px solid'}
          borderColor={'gray.300'}
        >
          <Image
            src='/images/bg-signup.jpg'
            alt='Group of people brainstorming'
            boxSize='full'
            loading='eager'
            maxH={{ base: '50vh', lg: 'full' }}
          />
        </Box>

        {/* Form Section */}
        <Flex
          as='section'
          order={{ base: 10, lg: -1 }}
          flex={{ base: 1, lg: 5 }}
          position='relative'
          bg={useColorModeValue('white', 'transparent')}
          direction={'column'}
          justifyContent={'space-between'}
          py={1}
          pb={4}
          gap={{ base: 12, lg: 0 }}
        >

          { /* Toggle Theme Button */}
          <NavigationButtons />

          <Box>
            <VStack spacing={{ base: 6, sm: 7, lg: 8 }} mx='auto' w={{ base: '90%', lg: '90%' }}>
              <Heading
                as='h1'
                size={useBreakpointValue({ base: 'lg', sm: 'xl', lg: 'lg', xl: 'xl' })}
              >
                Create Account
              </Heading>

              <Box w='90%' maxW='30rem'>
                <Formik
                  initialValues={{ email: '', password: '', confirmPassword: '' }}
                  validationSchema={signUpValidationSchema}
                  onSubmit={handleSubmit}
                >
                  {
                    () => (
                      <Form>
                        <VStack spacing={3}>
                          <FormControl>
                            <Input name='email' type='email' placeholder='Email' icon='email' />
                          </FormControl>

                          <FormControl>
                            <Input name='password' type='password' placeholder='Password' icon='password' />
                          </FormControl>

                          <FormControl>
                            <Input name='confirmPassword' type='password' placeholder='Confirm Password' icon='password' />
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
                          Sign Up
                        </Button>
                      </Form>
                    )
                  }
                </Formik>
              </Box>

              <Text fontSize='sm' fontWeight='medium'>
                Already have an account? {" "}
                <NextLink href='/login' passHref>
                  <Link
                    color='orange.500'
                    _hover={{
                      color: useColorModeValue("orange.600", "orange.400"),
                    }}
                    fontWeight={'semibold'}
                  >
                    Sign In
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

export default SignUp;
