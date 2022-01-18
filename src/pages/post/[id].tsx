import { useState } from 'react';

import { NextPage } from "next";
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '../../hooks/useAuth';

import Layout from '../../components/Layout';
import PostInteractiveArea from '../../components/PostInteractiveArea';
import CustomTextarea from '../../components/CustomTextarea';
import CustomPagination from '../../components/CustomPagination';
import { Box, Button, Container, Flex, FormControl, Heading, Link, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import { TAnswer } from '../../types/TAnswer';
import { AnswerForm } from '../../types/AnswerForm';

import { answerValidationSchema } from '../../helpers/validation/answerValidationSchema';
import { capitalizeWord } from '../../helpers/other/capitalizeWord';
import { compareTimestamps } from '../../helpers/other/compareTimestamps';

import { addAnswer, usePost } from '../../services/realtimeDatabase';

const Post: NextPage = () => {

  const router = useRouter();
  const postKey = router.query.id as string;
  const { post } = usePost(postKey);
  const { currentUser } = useAuth();
  const toast = useToast();

  async function handleCreateAnswer({ content }: AnswerForm) {

    let feedbackType: 'success' | 'error';
    let feedbackDescription: string;

    try {
      const newAnswer: TAnswer = {
        content,
        createdAt: new Date().getTime(),
        creatorEmail: currentUser!.email!,
        creatorId: currentUser!.uid,
        creatorPhotoURL: currentUser!.photoURL
      };

      await addAnswer(postKey, newAnswer);
      feedbackType = 'success';
      feedbackDescription = 'Your answer has been successfully added!';
    }

    catch (error) {
      console.log(error);
      feedbackType = 'error';
      feedbackDescription = 'An error has ocurred. Please, try again.';
    }

    toast({
      title: capitalizeWord(feedbackType),
      description: feedbackDescription,
      status: feedbackType,
      duration: 5000,
      isClosable: true,
    });
  }

  /* Pagination Area */

  const [currentSelectedPage, setCurrentSelectedPage] = useState<number>(1);
  const answersPerPage = 3;
  const totalAnswers = Object.keys(post).length > 0 ? post.answers!.length : 0;
  const pagesVisited = (currentSelectedPage - 1) * answersPerPage;

  const postAnswers = totalAnswers > 0 ? [...post.answers!] : [];
  postAnswers.sort(compareTimestamps).forEach((answer, index) => answer.index = totalAnswers - index);
  const currentPageAnswers = postAnswers.slice(pagesVisited, pagesVisited + answersPerPage);

  /* Special styles from Chakra (for light/dark mode) */

  const borderColor = useColorModeValue('gray.600', 'gray.300');
  const paginationBoxStyles = {
    bg: useColorModeValue('white', 'gray.700'),
    color: useColorModeValue('gray.900', 'white'),
    _focus: {
      border: '3px solid',
      borderColor: 'orange.400'
    }
  };

  return (
    <Layout>
      <Head>
        <title>ForumBase | {Object.keys(post).length !== 0 && post.title}</title>
        <meta name="description" content={post.title || 'ForumBase Post'} />
      </Head>

      <Container maxW='container.lg' my={8}>

        {
          Object.keys(post).length === 0 ?
            (
              <Box>
                <Heading size='3xl' textAlign={'center'}>Please, wait a moment...</Heading>
              </Box>
            )

            :

            (
              <Box>

                {/* Post Question Section */}
                <PostInteractiveArea
                  type='question'
                  postId={postKey}
                  title={post.title}
                  content={post.content}
                  creatorId={post.creatorId}
                  createdAt={post.createdAt}
                  creatorEmail={post.creatorEmail}
                  creatorPhotoURL={post.creatorPhotoURL}
                />

                {/* Post Answers Section */}
                <Box as='section'>
                  <Heading
                    as='h2'
                    my={12}
                    borderBottom={'3px solid'}
                    borderColor={borderColor}
                    size='md'
                    fontWeight={'bold'}
                    maxW={'max-content'}
                  >
                    {totalAnswers} Answer{totalAnswers !== 1 && 's'}
                  </Heading>

                  {
                    totalAnswers > 0 &&
                    <Stack direction='column' spacing={8}>
                      {
                          currentPageAnswers.map((answer: TAnswer) =>
                          <PostInteractiveArea
                            key={answer.id!}
                            type='answer'
                            postId={postKey}
                              answerId={answer.id!} 
                              title={`Answer ${answer.index! < 10 && '0'}${answer.index!}`}
                            creatorId={answer.creatorId}
                            content={answer.content}
                            createdAt={answer.createdAt}
                            creatorEmail={answer.creatorEmail}
                            creatorPhotoURL={answer.creatorPhotoURL}
                          />
                        )
                      }
                    </Stack>
                  }

                </Box>

                {/* Answers Pagination Section */}

                {
                  totalAnswers > 0 && 
                  <Box
                    as='section'
                    {...paginationBoxStyles}
                    mt={12}
                    p={2}
                  >
                    <CustomPagination
                      contentTotalSize={totalAnswers}
                      contentPerPage={answersPerPage}
                      setCurrentSelectedPage={setCurrentSelectedPage}
                    />
                  </Box>
                }

                {/* Create Answer Section */}
                <Box
                  as='section'
                  my={12}
                >
                  <Heading
                    as='h2'
                    size='md'
                    fontWeight={'bold'}
                    mb={8}
                  >
                    Your Answer
                  </Heading>

                  <Formik
                    initialValues={{ content: '' }}
                    validationSchema={answerValidationSchema}
                    onSubmit={(values, actions) => {
                      handleCreateAnswer(values);
                      actions.setSubmitting(false);
                      actions.resetForm();
                    }}
                  >
                    {() =>
                      <Form>
                        <FormControl>
                          <CustomTextarea name={'content'} placeholder={'Please, be kind when responding!'} />
                        </FormControl>

                        <Flex
                          mt={4}
                          gap={6}
                          w='full'
                          direction={{ base: 'column', sm: 'row' }}
                          justifyContent={{ base: 'flex-start', sm: (!!currentUser ? 'flex-end' : 'space-between') }}
                        >
                          {
                            !currentUser &&
                            <Text fontSize={'sm'} textAlign={'left'}>
                              <NextLink href='/login' passHref>
                                <Link>
                                  Log in
                                </Link>
                              </NextLink>
                              {' '} to submit your answer!
                            </Text>
                          }

                          <Button
                            mt={{ base: 3, sm: 0 }}
                            variant='primary'
                            type='submit'
                            w={{ base: 'full', sm: 'max-content' }}
                            isDisabled={!currentUser}
                          >
                            Submit
                          </Button>
                        </Flex>
                      </Form>
                    }
                  </Formik>
                </Box>
              </Box>
            )
        }
      </Container>
    </Layout>
  );
};

export default Post;