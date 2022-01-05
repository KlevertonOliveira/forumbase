import React, { useState } from 'react';

import Link from 'next/link';

import { TPost } from '../../types/TPost';
import Post from '../Post';
import { Box } from '@chakra-ui/react';
import CustomPagination from '../CustomPagination';

type PostsProps = {
  posts: TPost[];
};

const Posts: React.FC<PostsProps> = ({ posts }) => {

  const [currentSelectedPage, setCurrentSelectedPage] = useState<number>(1);
  const postsPerPage = 4;
  const postsTotal = posts.length;
  const pagesVisited = (currentSelectedPage - 1) * postsPerPage;
  const currentPagePosts = posts.slice(pagesVisited, pagesVisited + postsPerPage);

  return (
    <Box as='section' minW={0}>
      {
        currentPagePosts.map(post =>
          <Link
            key={post.id}
            href={`post/${post.id}`}
          >
            <a>
              <Post post={post} />
            </a>
          </Link>
        )
      }

      <CustomPagination
        postsTotal={postsTotal}
        postsPerPage={postsPerPage}
        setCurrentSelectedPage={setCurrentSelectedPage}
      />
    </Box>
  );
};

export default Posts;