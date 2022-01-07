import React from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';

import Input from '../components/Input';
import MenuButton from '../components/MenuButton';
import { Image, Box, Button, FormControl, Heading, Text, Link, useColorModeValue, VStack, Flex, useBreakpointValue, HStack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import { ForgotPasswordForm } from '../types/ForgotPasswordForm';
import { forgotPasswordValidationSchema } from '../helpers/validation/forgotPasswordValidationSchema';


const ForgotPassword: NextPage = () => {

  const ctaButton = useColorModeValue('orange.400', 'orange.500');
  const ctaButtonHover = useColorModeValue('orange.500', 'orange.400');

  function handleSubmit({ email }: ForgotPasswordForm) {
    alert(`${email}`);
  }

  return (
    <Flex
      as='main'
      minH='100vh'
    >
      <Head>
        <title>ForumBase | Forgot Password</title>
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
            src='/images/forgot-password.svg'
            alt='Illustration of a man looking at a board with an unknown password'
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
          bg={useColorModeValue('mainGray.100', 'transparent')}
          direction={'column'}
          justifyContent={'space-between'}
          py={1}
          pb={8}
          gap={{ base: 12, lg: 0 }}
        >

          <Flex justifyContent={`flex-end`} m={1}>
            <MenuButton />
          </Flex>

          <Box>
            <VStack spacing={{ base: 6, sm: 7, lg: 8 }} mx='auto' w={{ base: '90%', lg: '90%' }}>
              <Heading
                as='h1'
                size={useBreakpointValue({ base: 'lg', sm: 'xl', lg: 'lg', xl: 'xl' })}
              >
                Redefine Password
              </Heading>

              <Box w='90%' maxW='30rem'>
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={forgotPasswordValidationSchema}
                  onSubmit={handleSubmit}
                >
                  {
                    () => (
                      <Form>
                        <FormControl>
                          <Input name='email' type='email' placeholder='Your Email' icon='email' />
                        </FormControl>

                        <Button
                          aria-label='Submit Form'
                          w='full'
                          mt={4}
                          bg={ctaButton}
                          colorScheme='orange'
                          color='white'
                          _hover={{
                            background: ctaButtonHover,
                          }}
                          type='submit'
                        >
                          Reset Password
                        </Button>
                      </Form>
                    )
                  }
                </Formik>
              </Box>

            </VStack>
          </Box>

          <Flex justifyContent={'flex-end'} mr={3}>
            <NextLink href='/login' passHref>
              <Link>
                Return to Login
              </Link>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
    </Flex >
  );
};

export default ForgotPassword;
