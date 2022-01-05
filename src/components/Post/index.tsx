import { Avatar, Box, Flex, Heading, Text, Image, useColorModeValue } from '@chakra-ui/react';
import { FC } from "react";
import { getUsernameFromEmail } from '../../helpers/other/getUsernameFromEmail';
import { TPost } from '../../types/TPost';
import { categories } from '../../data/categories';

type PostProps = {
  post: TPost;
};

const Post: FC<PostProps> = ({ post }) => {

  const category = categories.find(category => category.title.toLowerCase() === post.category.toLowerCase());

  return (
    <Flex
      as='article'
      w='full'
      bg={useColorModeValue('white', 'gray.700')}
      color={useColorModeValue('gray.900', 'gray.200')}
      transition="background-color 350ms ease-in-out"
      _hover={{
        bg: useColorModeValue('blue.100', 'gray.600'),
      }}
      boxShadow={'md'}
      borderRadius={'md'}
      p={2}
      cursor='pointer'
      gap={4}
      borderBottom='1px solid'
      borderColor={useColorModeValue('gray.300', 'gray.600')}
      minW={0}
    >
      <Box>
        <Avatar size='md' name={post.creatorEmail} />
      </Box>

      <Flex
        flex={1}
        minWidth={0}
        direction={'column'}
        justifyContent={'space-between'}
      >
        <Heading as='h3' size={'sm'} isTruncated>
          {post.title}
        </Heading>

        <Text fontSize='xs' isTruncated>
          <strong>{getUsernameFromEmail(post.creatorEmail)}</strong> {" "}
          started 3 weeks ago
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