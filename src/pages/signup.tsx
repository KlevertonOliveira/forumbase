import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';

import MenuButton from '../components/MenuButton';
import { Formik, Form } from 'formik';
import { Image, Box, Button, FormControl, Heading, Text, Link, useColorModeValue, VStack, useColorMode, Flex, useBreakpointValue, HStack, useToast } from '@chakra-ui/react';

import { SignUpForm } from '../types/SignUpForm';
import { signUpValidationSchema } from '../helpers/validation/signUpValidationSchema';
import { useAuth } from '../hooks/useAuth';
import { usePublicRoute } from '../hooks/usePublicRoute';
import { useRouter } from 'next/router';
import SignInWithGoogleButton from '../components/SignInWithGoogleButton';
import CustomInput from '../components/CustomInput';
import CustomMenuButton from '../components/MenuButton';

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
          bg={'white'}
        >
          <Image
            src='/images/join.svg'
            alt='An illustration of animated characters greeting each other.'
            boxSize='full'
            p={4}
            maxH={{ base: '50vh', lg: 'full' }}
          />
        </Box>

        {/* Form Section */}
        <Flex
          as='section'
          order={{ base: 10, lg: -1 }}
          flex={{ base: 1, lg: 5 }}
          bg={useColorModeValue('mainGray.200', 'transparent')}
          direction={'column'}
          justifyContent={'space-between'}
          py={1}
          pb={{ base: 8, lg: 4 }}
          gap={{ base: 12, lg: 0 }}
        >

          <Flex justifyContent={`flex-end`} my={1} mx={2}>
            <CustomMenuButton avatarSize='md' />
          </Flex>

          <Box>
            <VStack spacing={{ base: 6, sm: 7, lg: 8 }} mx='auto' w={{ base: '90%', lg: '90%' }}>
              <Heading
                as='h1'
                textAlign={'center'}
                size={useBreakpointValue({ base: 'lg', sm: 'xl', lg: 'lg', xl: 'xl' })}
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

              <Text fontSize='sm' fontWeight='medium'>
                Already have an account? {" "}
                <NextLink href='/login' passHref>
                  <Link>Sign In</Link>
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

export default usePublicRoute(SignUp);