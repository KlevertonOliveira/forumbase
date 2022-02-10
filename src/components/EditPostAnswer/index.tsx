import { FC } from "react";

import CustomTextarea from '../CustomTextarea';
import { FormControl, FormLabel, Text, Box, Tooltip, IconButton, useColorModeValue, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import { AnswerForm } from '../../types/AnswerForm';
import { updateAnswer } from '../../services/realtimeDatabase';
import { answerValidationSchema } from '../../utils/validation/answerValidationSchema';
import { capitalizeWord } from '../../utils/other/capitalizeWord';

import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

type EditPostAnswerProps = {
  postId: string;
  answerId: string;
  currentContent: string;
  setIsEditing: (value: boolean) => void;
};

const EditPostAnswer: FC<EditPostAnswerProps> = ({ postId, answerId, currentContent, setIsEditing }) => {

  const toast = useToast();

  async function handleSubmit({ content }: AnswerForm) {

    let feedbackType: 'success' | 'error' | 'warning';
    let feedbackDescription: string;

    if (content === currentContent) {
      feedbackType = 'warning';
      feedbackDescription = 'No changes have been detected!';
    }

    else {
      try {
        await updateAnswer(postId, answerId, { content });
        feedbackType = 'success';
        feedbackDescription = 'Your answer has been successfully updated!';
      }

      catch (error) {
        console.log(error);
        feedbackType = 'error';
        feedbackDescription = 'An error has ocurred. Please, try again!';
      }
    }

    setIsEditing(false);
    toast({
      title: capitalizeWord(feedbackType),
      description: feedbackDescription,
      status: feedbackType,
      duration: 5000,
      isClosable: true,
    });
  }

  /* Special styles from Chakra (for light/dark mode) */

  const iconButtonBg = useColorModeValue('whiteAlpha.700', 'gray.700');

  return (
    <Formik
      initialValues={{ content: currentContent }}
      validationSchema={answerValidationSchema}
      onSubmit={handleSubmit}
    >
      {
        () => (
          <Form>
            <FormControl>
              <FormLabel htmlFor='content'>
                Content
                <Text display={'inline'} text='sm' color={'red.500'}>*</Text>
              </FormLabel>
              <CustomTextarea name='content' placeholder='Post Content' />
            </FormControl>

            <Box mt={3}>
              <Tooltip label='Confirm changes'>
                <IconButton
                  aria-label='Confirm changes'
                  type='submit'
                  icon={<CheckIcon />}
                  bg={iconButtonBg}
                />
              </Tooltip>

              <Tooltip label='Cancel changes'>
                <IconButton
                  aria-label='Cancel changes'
                  icon={<CloseIcon />}
                  bg={iconButtonBg}
                  ml={1}
                  type='button'
                  onClick={() => { setIsEditing(false); }}
                />
              </Tooltip>
            </Box>
          </Form>
        )
      }
    </Formik>
  );
};

export default EditPostAnswer;