import React, { useState } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '../hooks/useAuth';
import { usePublicRoute } from '../hooks/usePublicRoute';

import PagesGrid from '../components/PagesGrid';
import CustomInput from '../components/CustomInput';
import SignInWithGoogleButton from '../components/SignInWithGoogleButton';
import { Box, Button, FormControl, Heading, Text, Link, VStack, Flex, useBreakpointValue, HStack, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import { SignUpForm } from '../types/SignUpForm';
import { signUpValidationSchema } from '../helpers/validation/signUpValidationSchema';

import { signUpBgImage } from '../data/pagesBgImages';

const SignUp: NextPage = () => {

  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  async function handleSubmit({ email, password }: SignUpForm) {

    setLoading(true);

    try {
      await signUp(email, password);
      setLoading(false);
      router.push('/');

    } catch (error) {
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
      {...signUpBgImage}
      changeSectionsOrder
    >
      <Head>
        <title>ForumBase | Sign Up</title>
      </Head>

      <Flex
        direction={'column'}
        justifyContent={'space-between'}
        my={{ base: 12, lg: 8 }}
      >
        <VStack
          spacing={{ base: 6, sm: 7, lg: 8 }}
          w='90%'
          mx='auto'
        >
          <Heading
            as='h1'
            textAlign={'center'}
            size={useBreakpointValue({ base: 'lg', sm: 'xl' })}
          >
            Create an Account and
            <br />
            Join our community!
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
                        <CustomInput name='email' type='email' placeholder='Email' icon='email' />
                      </FormControl>

                      <FormControl>
                        <CustomInput name='password' type='password' placeholder='Password' icon='password' />
                      </FormControl>

                      <FormControl>
                        <CustomInput name='confirmPassword' type='password' placeholder='Confirm Password' icon='password' />
                      </FormControl>
                    </VStack>

                    <Button
                      aria-label='Submit Form'
                      w='full'
                      mt={4}
                      variant='primary'
                      type='submit'
                      disabled={loading}
                    >
                      Sign Up
                    </Button>
                  </Form>
                )
              }
            </Formik>
          </Box>

          <Text fontSize='md' fontWeight='medium'>
            Already have an account? {" "}
            <NextLink href='/login' passHref>
              <Link>Sign In</Link>
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

export default usePublicRoute(SignUp);