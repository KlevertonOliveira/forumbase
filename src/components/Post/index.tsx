import { FC } from "react";

import { Avatar, Box, Flex, Heading, Text, Image } from '@chakra-ui/react';

import { TPost } from '../../types/TPost';
import { getUsernameFromEmail } from '../../utils/other/getUsernameFromEmail';
import { getTimeDifferenceToPostTimestamp } from '../../utils/other/getTimeDifferenceToPostTimestamp';
import { categories } from '../../data/categories';

type PostProps = {
  post: TPost;
};

const Post: FC<PostProps> = ({ post }) => {

  const postCategory = categories.find(
    category => category.title.toLowerCase() === post.category.toLowerCase()
  );

  return (
    <Flex
      as='article'
      gap={4}
      w='full'
      minW={0}
      textAlign={'left'}
    >
      <Box>
        <Avatar size='md' src={post.creatorPhotoURL!} name={post.creatorEmail} />
      </Box>

      <Flex
        flex={1}
        minW={0}
        direction={'column'}
        justifyContent={'space-between'}
      >
        <Heading as='h3' size={'sm'} isTruncated>
          {post.title}
        </Heading>

        <Text fontSize='xs' isTruncated>
          <strong>{getUsernameFromEmail(post.creatorEmail)}</strong> {" "}
          started {getTimeDifferenceToPostTimestamp(post.createdAt)} ago
        </Text>
      </Flex>

      <Box>
        <Image
          src={postCategory?.iconPath}
          alt={postCategory?.alt}
        />
      </Box>
    </Flex>
  );
};

export default Post;