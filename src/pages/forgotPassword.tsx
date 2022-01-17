import React from 'react';

import { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';

import { useAuth } from '../hooks/useAuth';
import { usePublicRoute } from '../hooks/usePublicRoute';

import PagesGrid from '../components/PagesGrid';
import Input from '../components/CustomInput';
import ReturnToLinkButton from '../components/ReturnToLinkButton';
import { Box, Button, FormControl, Heading, Text, Link, Flex, useBreakpointValue, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import { ForgotPasswordForm } from '../types/ForgotPasswordForm';
import { forgotPasswordValidationSchema } from '../helpers/validation/forgotPasswordValidationSchema';

import { forgotPasswordBgImage } from '../data/pagesBgImages';
import { capitalizeWord } from '../helpers/other/capitalizeWord';

const ForgotPassword: NextPage = () => {

  const { sendRedefinePasswordEmail } = useAuth();
  const toast = useToast();

  async function handleSubmit({ email }: ForgotPasswordForm) {

    let feedbackType: 'error' | 'success';
    let feedbackDescription: string;

    try {
      await sendRedefinePasswordEmail(email);
      feedbackType = 'success';
      feedbackDescription = `An email has been sent to ${email}.
      Please, follow the instructions to reset your password.`;
    }

    catch (error) {
      console.log(error);
      feedbackType = 'error';
      feedbackDescription = `An error has ocurred.\nPlease, make sure the email address provided is correct and try again.`;
      console.log(feedbackDescription);
      ;
    }

    toast({
      title: capitalizeWord(feedbackType),
      description: feedbackDescription,
      status: feedbackType,
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <PagesGrid
      {...forgotPasswordBgImage}
    >
      <Head>
        <title>ForumBase | Forgot Password</title>
      </Head>

      <Flex
        direction={'column'}
        justifyContent={'space-between'}
        alignItems={'center'}
        my={12}
        mx={'auto'}
        w={'90%'}
      >
        <Box>
          <Heading
            as='h1'
            textAlign={'center'}
            size={useBreakpointValue({ base: 'xl', sm: '2xl' })}
            mb={8}
          >
            Forgot Password
          </Heading>

          <Text
            maxW={'30rem'}
            textAlign={'center'}
            fontWeight={'semibold'}
            fontSize={{ base: 'sm', sm: 'md', lg: 'lg' }}
          >
            Don&apos;t worry, it happens to the best of us.
          </Text>

          <Box w='full' maxW='35rem' mt={12}>
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
                      variant='primary'
                      type='submit'
                      aria-label='Submit Form'
                      w='full'
                      mt={4}
                    >
                      Reset Password
                    </Button>
                  </Form>
                )
              }
            </Formik>

            <Text
              fontSize='md'
              fontWeight='medium'
              textAlign={'center'}
              mt={8}
            >
              Don&apos;t have an account? {" "}
              <NextLink href='/signup' passHref>
                <Link
                >
                  Sign Up
                </Link>
              </NextLink>
            </Text>
          </Box>
        </Box>

        <Flex justifyContent={'center'}>
          <ReturnToLinkButton linkPage='Login' />
        </Flex>

      </Flex>
    </PagesGrid>
  );
};

export default usePublicRoute(ForgotPassword);
