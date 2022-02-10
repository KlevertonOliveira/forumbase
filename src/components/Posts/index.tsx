import { FC, useState } from "react";
import { useRouter } from 'next/router';

import Post from '../Post';
import CustomPagination from '../CustomPagination';
import { Box, Table as ChakraTable, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';

import { TPost } from '../../types/TPost';
import { compareTimestamps } from '../../utils/other/compareTimestamps';

type PostsProps = {
  posts: TPost[];
};

const Posts: FC<PostsProps> = ({ posts }) => {

  const router = useRouter();

  function redirectUserToPost(postId: string) {
    return router.push(`post/${postId}`);
  }

  /* Pagination Area */

  const [currentSelectedPage, setCurrentSelectedPage] = useState<number>(1);
  const postsPerPage = 4;
  const postsTotal = posts.length;
  const pagesVisited = (currentSelectedPage - 1) * postsPerPage;
  const currentPagePosts = posts.sort(compareTimestamps).slice(pagesVisited, pagesVisited + postsPerPage);

  /* Special styles from Chakra (for light/dark mode) */

  const tableRowStyles = {
    bg: useColorModeValue('white', 'gray.700'),
    color: useColorModeValue('gray.900', 'white'),
    _hover: { backgroundColor: useColorModeValue('blue.100', 'gray.600') },
    transition: "background-color 200ms ease-in-out",
    _focus: {
      border: '3px solid',
      borderColor: 'orange.400'
    }
  };

  const tableDataStyles = {
    borderBottom: '1px solid',
    borderColor: useColorModeValue('gray.300', 'gray.600'),
    p: 2
  };

  return (
    <Box w={'full'}>
      <ChakraTable variant='simple' w='full' size={'md'} style={{ tableLayout: 'fixed' }}>
        <Thead>
          <Tr>
            <Th textAlign={'left'}>Posts</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            currentPagePosts.map((post: TPost) => {
              return (
                <Tr
                  key={post.id}
                  {...tableRowStyles}
                  cursor={'pointer'}
                  tabIndex={0}
                  title={`Go to "${post.title}"`}
                  onClick={() => { redirectUserToPost(post.id!); }}
                  onKeyPress={(event) => {
                    (event.key === 'Enter' || event.key === ' ') &&
                      redirectUserToPost(post.id!);
                  }}
                >
                  <Td {...tableDataStyles}>
                    <Post post={post} />
                  </Td>
                </Tr>
              );
            }
            )
          }
          <Tr bg={tableRowStyles.bg}>
            <Td {...tableDataStyles} p={3}>
              <CustomPagination
                contentTotalSize={postsTotal}
                contentPerPage={postsPerPage}
                setCurrentSelectedPage={setCurrentSelectedPage}
              />
            </Td>
          </Tr>
        </Tbody>
      </ChakraTable>
    </Box>
  );
};

export default Posts;