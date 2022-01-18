import { FormEvent, useState } from 'react';

import type { NextPage } from 'next';
import Head from 'next/head';

import CreatePostDrawer from '../components/CreatePostDrawer';
import Posts from '../components/Posts';
import Layout from '../components/Layout';
import CustomTable from '../components/CustomTable';
import { Box, Container, Flex, Input, InputGroup, InputLeftElement, Select, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { usePosts } from '../services/realtimeDatabase';
import { TPost } from '../types/TPost';
import { categories } from '../data/categories';

const Home: NextPage = () => {

  const { posts } = usePosts();
  const allPosts = [...posts];

  /* Selected Category Area */

  const [selectedCategory, setSelectedCategory] = useState("ALL");

  function getSelectedCategory(event: React.ChangeEvent<HTMLSelectElement>) {
    const newSelectedCategory = event.target.value;
    setSelectedCategory(newSelectedCategory);
  }

  function filterPostsBySelectedCategory(post: TPost) {
    return post.category === selectedCategory || selectedCategory === 'ALL';
  }

  /* Searching Posts Area */

  const [isSearching, setIsSearching] = useState(false);
  const [postsSearchResult, setPostsSearchResult] = useState([] as TPost[]);

  function searchPostsByTitle(event: FormEvent) {

    const searchContent = (event.target as HTMLInputElement).value;

    if (searchContent.length > 0) {
      setIsSearching(true);

      const searchResult = allPosts.filter(post => {
        const rule = new RegExp(searchContent, "gi");
        return rule.test(post.title);
      });

      setPostsSearchResult(searchResult);

    } else {
      setIsSearching(false);
    }
  }

  return (
    <Layout>

      <Head>
        <title>ForumBase | Home</title>
        <meta name="description" content="Ask your questions, help other users with your knowledge, and contribute to the ForumBase developer community." />
      </Head>

      <main>
        <Container maxW='container.lg' my={8}>

          {/* Section 1 -> Create Post Button + Search Input */}
          <Flex
            as='section'
            w='full'
            mt={8}
            alignItems={'center'}
            gap={{ base: 4, sm: 6, lg: 8 }}>

            <CreatePostDrawer />

            <InputGroup flex={1}>

              <InputLeftElement mt={1}>
                <SearchIcon />
              </InputLeftElement>

              <Input
                id='search'
                name='search'
                placeholder='Search Post'
                size='lg'
                onChange={searchPostsByTitle}
              />
            </InputGroup>

          </Flex>

          {/* Section 2 (Mobile Only) - Category Filter Selection*/}
          <Flex
            as='section'
            w='full'
            mt={8}
            display={{ base: 'flex', md: 'none' }}
            alignItems={'center'}
            gap={3}>

            <Text fontWeight={'semibold'}>Category: </Text>

            <Select
              id='category'
              name='category'
              bg={useColorModeValue('white', 'gray.700')}
              onChange={getSelectedCategory}
              value={selectedCategory}
            >
              <option value="ALL">ALL</option>
              {
                categories.map(category =>
                  <option
                    key={category.title}
                    value={category.title}
                  >
                    {category.title}
                  </option>
                )
              }
            </Select>
          </Flex>

          {/* Section 2 (Md size and greater) -> Category Select + Posts */}
          <Flex
            as='section'
            mt={8}
            w='full'
            alignItems={'flex-start'}
            gap={{ base: 4, sm: 6, lg: 8 }}
          >
            <Box display={{ base: 'none', md: 'flex' }}>
              <CustomTable
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </Box>

            <Box flex={1} minW={0}>
              {
                isSearching ?
                  <Posts posts={postsSearchResult.filter(filterPostsBySelectedCategory)} />
                  :
                  <Posts posts={allPosts.filter(filterPostsBySelectedCategory)} />
              }
            </Box>
          </Flex>    
        </Container>

      </main>
    </Layout>
  );
};

export default Home;
