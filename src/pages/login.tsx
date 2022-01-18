import React, { useState } from 'react';

import { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

import PagesGrid from '../components/PagesGrid';
import CustomInput from '../components/CustomInput';
import SignInWithGoogleButton from '../components/SignInWithGoogleButton';
import { Box, Button, FormControl, Heading, Text, Link, VStack, Flex, useBreakpointValue, HStack, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import { signInValidationSchema } from '../helpers/validation/signInValidationSchema';
import { LoginForm } from '../types/LoginForm';

import { useAuth } from '../hooks/useAuth';
import { usePublicRoute } from '../hooks/usePublicRoute';

import { loginBgImage } from '../data/pagesBgImages';

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
    <PagesGrid
      {...loginBgImage}
    >
      <Head>
        <title>ForumBase | Log In</title>
        <meta name="description" content="Log in to your ForumBase account and be part of our community." />
      </Head>

      <Flex
        direction={'column'}
        justifyContent={'space-between'}
        my={12}
      >
        <VStack
          spacing={{ base: 6, sm: 7, lg: 8 }}
          w='90%'
          mx='auto'
        >
          <Heading
            as='h1'
            mb={4}
            textAlign={'center'}
            size={useBreakpointValue({ base: 'lg', sm: '2xl', lg: 'xl' })}
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

          <Text fontSize='md' fontWeight='medium'>
            Don&apos;t have an account? {" "}
            <NextLink href='/signup' passHref>
              <Link
              >
                Sign Up
              </Link>
            </NextLink>
          </Text>
        </VStack>

        <HStack justifyContent='center' spacing={4}>
          <Text>
            Or
          </Text>
          <SignInWithGoogleButton loading={loading} setLoading={setLoading} />
        </HStack>
      </Flex>

    </PagesGrid>
  );
};

export default usePublicRoute(Login);