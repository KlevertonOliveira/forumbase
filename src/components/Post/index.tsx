import { Avatar, Box, Flex, Heading, Text, Image } from '@chakra-ui/react';
import { FC } from "react";
import { getUsernameFromEmail } from '../../helpers/other/getUsernameFromEmail';
import { TPost } from '../../types/TPost';
import { categories } from '../../data/categories';
import { getTimeDifferenceToPostTimestamp } from '../../helpers/other/getTimeDifferenceToPostTimestamp';

type PostProps = {
  post: TPost;
};

const Post: FC<PostProps> = ({ post }) => {

  const category = categories.find(
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
        <Avatar size='md' name={post.creatorEmail} />
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
          src={category?.iconPath}
          alt={category?.alt}
        />
      </Box>
    </Flex>
  );
};

export default Post;