import { FC, useState } from "react";

import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

import EditPostQuestion from '../EditPostQuestion';
import EditPostAnswer from '../EditPostAnswer';
import CustomAlertDialog from '../CustomAlertDialog';
import { Box, Flex, Heading, Text, IconButton, useColorModeValue, Avatar, Tooltip, useToast } from '@chakra-ui/react';

import { getTimeDifferenceToPostTimestamp } from '../../helpers/other/getTimeDifferenceToPostTimestamp';
import { getUsernameFromEmail } from '../../helpers/other/getUsernameFromEmail';
import { capitalizeWord } from '../../helpers/other/capitalizeWord';

import { removeAnswer, removePost } from '../../services/realtimeDatabase';

import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

interface CommonProps {
  postId: string;
  title: string;
  creatorId: string;
  content: string;
  createdAt: number;
  creatorEmail: string;
  creatorPhotoURL: string | null;
}

type PostInteractiveAreaProps = CommonProps & (
  | { type: 'question'; answerId?: never; }
  | { type: 'answer'; answerId: string; }
);

const PostInteractiveArea: FC<PostInteractiveAreaProps> = (
  { type, title, creatorId, content,
    createdAt, creatorEmail, creatorPhotoURL,
    postId, answerId
  }
) => {

  const { currentUser } = useAuth();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);

  const [isAlertDialogOpen, setIsOpenDialogOpen] = useState(false);
  function openAlertDialog() { setIsOpenDialogOpen(true); };
  function closeAlertDialog() { setIsOpenDialogOpen(false); };

  const toast = useToast();

  async function deleteInteractiveArea() {

    let feedbackType: 'success' | 'error';
    let feedbackContent: string;

    try {
      if (type === 'question') {
        await removePost(postId);
        router.replace('/');
      }
      else {
        await removeAnswer(postId, answerId!);
      }

      feedbackType = 'success';
      feedbackContent = `Your ${type === 'question' ? 'post' : 'answer'} has been successfully removed!`;
    }

    catch (error) {
      console.log(error);
      feedbackType = 'error';
      feedbackContent = 'An error has ocurred. Please, try again!';
    }

    toast({
      title: capitalizeWord(feedbackType),
      description: feedbackContent,
      status: feedbackType,
      duration: 5000,
      isClosable: true,
    });
  }

  /* Special styles from Chakra (for light/dark mode) */

  const iconButtonBg = useColorModeValue('whiteAlpha.700', 'gray.700');
  const elementsBorderColor = useColorModeValue('gray.500', 'gray.300');

  return (
    <>
      {
        isEditing ?

          (
            <Box as='section'>
              {
                type === 'question' ?
                  <EditPostQuestion postId={postId} currentTitle={title} currentContent={content} setIsEditing={setIsEditing} />
                  :
                  <EditPostAnswer postId={postId} currentContent={content} answerId={answerId!} setIsEditing={setIsEditing} />
              }
            </Box>
          )

          :

          (
            <Box
              as='section'
              pb={6}
              borderBottom='2px solid'
              borderColor={elementsBorderColor}
            >
              <Flex
                pb={3}
                borderBottom={'2px solid'}
                borderColor={elementsBorderColor}
                w='full'
                maxW='100vw'
                justifyContent={'space-between'}
                alignItems={'center'}
                gap={8}
              >
                <Heading
                  as={type === 'question' ? 'h1' : 'h3'}
                  size={type === 'question' ? 'lg' : 'sm'}
                  maxW='100vw'
                  overflow={'hidden'}
                  fontWeight={'bold'}
                >
                  {title}
                </Heading>

                {
                  !!currentUser && currentUser.uid === creatorId &&
                  <Box>
                    <Tooltip label={`Edit ${capitalizeWord(type)}`}>
                      <IconButton
                        aria-label={`Edit ${capitalizeWord(type)}`}
                        icon={<EditIcon />}
                        bg={iconButtonBg}
                        onClick={() => { setIsEditing(true); }}
                      />
                    </Tooltip>

                    {
                      !isEditing &&
                      <Tooltip label={`Delete ${capitalizeWord(type)}`}>
                        <IconButton
                          aria-label={`Delete ${capitalizeWord(type)}`}
                          icon={<DeleteIcon />}
                          bg={iconButtonBg}
                          ml={1}
                          onClick={openAlertDialog}
                        />
                      </Tooltip>
                    }
                  </Box>
                }
              </Flex>

              <Text py={6} fontWeight={'medium'}>
                {content}
              </Text>

              <Flex justifyContent={'flex-end'}>
                <Box
                  bg={type === 'question' ? 'blue.100' : 'white'}
                  color='gray.700'
                  p={3}
                  rounded={'lg'}
                >
                  <Text fontSize={'sm'} mb={2}>
                    {type === 'question' ? 'Asked' : 'Answered'} {" "}
                    <strong>{getTimeDifferenceToPostTimestamp(createdAt)} ago</strong>
                  </Text>

                  <Flex w='full' alignItems={'center'} gap={2}>
                    <Avatar src={creatorPhotoURL!} alt='Person' size={'sm'} name={creatorEmail} />
                    <Text fontWeight={'semibold'} fontSize='sm'>{getUsernameFromEmail(creatorEmail)}</Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          )
      }

      <CustomAlertDialog
        title={`Delete ${type == 'question' ? 'Post' : 'Answer'}`}
        deleteInteractiveArea={deleteInteractiveArea}
        isOpen={isAlertDialogOpen}
        onClose={closeAlertDialog}
      />
    </>
  );
};

export default PostInteractiveArea;