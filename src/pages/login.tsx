import React, { useState } from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';

import CustomInput from '../components/CustomInput';
import { Image, Box, Button, FormControl, Heading, Text, Link, useColorModeValue, VStack, Flex, useBreakpointValue, HStack, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import { signInValidationSchema } from '../helpers/validation/signInValidationSchema';
import { LoginForm } from '../types/LoginForm';

import MenuButton from '../components/MenuButton';

import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import SignInWithGoogleButton from '../components/SignInWithGoogleButton';
import { usePublicRoute } from '../hooks/usePublicRoute';
import CustomMenuButton from '../components/MenuButton';

const Login: NextPage = () => {

  const { login } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit({ email, password }: LoginForm) {

    setLoading(true);

    try {
      await login(email, password);
      setLoading(false);
      router.push('/');
    }
    catch (error) {
      console.log(error);
      toast({
        title: 'Error!',
        description: "Error when trying to log user in. Please, try again.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
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
          bg={useColorModeValue('mainGray.200', 'transparent')}
          direction={'column'}
          justifyContent={'space-between'}
          py={1}
          pb={8}
          gap={{ base: 12, lg: 0 }}
        >

          <Flex justifyContent={`flex-end`} m={1}>
            <CustomMenuButton avatarSize='md' />
          </Flex>

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
                          <CustomInput name='email' type='email' placeholder='Email' icon='email' />
                        </FormControl>

                        <FormControl mt={3}>
                          <CustomInput name='password' type='password' placeholder='Password' icon='password' />
                        </FormControl>

                        <Flex justifyContent={'flex-end'} mt={3}>
                          <NextLink href='/forgotPassword' passHref>
                            <Link>Forgot password?</Link>
                          </NextLink>
                        </Flex>

                        <Button
                          aria-label='Submit Form'
                          w='full'
                          mt={4}
                          variant='primary'
                          type='submit'
                          disabled={loading}
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
            <SignInWithGoogleButton loading={loading} setLoading={setLoading} />
          </HStack>

        </Flex>
      </Flex>
    </Flex >
  );
};

export default usePublicRoute(Login);