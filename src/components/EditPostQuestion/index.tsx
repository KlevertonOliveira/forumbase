import { FC } from "react";

import CustomInput from '../CustomInput';
import CustomTextarea from '../CustomTextarea';
import { FormControl, FormLabel, Text, Box, Tooltip, IconButton, useColorModeValue, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import { capitalizeWord } from '../../utils/other/capitalizeWord';
import { editPostValidationSchema } from '../../utils/validation/editPostValidationSchema';
import { EditPostForm } from '../../types/EditPostForm';
import { updatePost } from '../../services/realtimeDatabase';

import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

type EditPostQuestionProps = {
  postId: string;
  currentTitle: string;
  currentContent: string;
  setIsEditing: (value: boolean) => void;
};

const EditPostQuestion: FC<EditPostQuestionProps> = ({ postId, currentTitle, currentContent, setIsEditing }) => {

  const toast = useToast();

  async function handleSubmit({ title, content }: EditPostForm) {

    let feedbackType: 'success' | 'error' | 'warning';
    let feedbackDescription: string;

    if (title === currentTitle && content === currentContent) {
      feedbackType = 'warning';
      feedbackDescription = 'No changes have been detected!';
    }

    else {
      try {
        await updatePost(postId, { title, content });
        feedbackType = 'success';
        feedbackDescription = 'Your post has been successfully updated!';
      }

      catch (error) {
        console.log(error);
        feedbackType = 'error';
        feedbackDescription = 'An error has ocurred.Please, try again!';
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
      initialValues={{ title: currentTitle, content: currentContent }}
      validationSchema={editPostValidationSchema}
      onSubmit={handleSubmit}
    >
      {
        () => (
          <Form>
            <FormControl mb={3}>

              <FormLabel htmlFor='title'>
                Title
                <Text display={'inline'} text='sm' color={'red.500'}>*</Text>
              </FormLabel>
              <CustomInput name='title' type='text' placeholder='Post Title' icon='info' />
            </FormControl>

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

export default EditPostQuestion;