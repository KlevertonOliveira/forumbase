import { FC } from 'react';
import NextLink from 'next/link';

import { Box, Flex, Icon, Text, Link, useColorModeValue, Container } from '@chakra-ui/react';

import { MdQuestionAnswer } from 'react-icons/md';
import MenuButton from '../MenuButton';

const Navbar: FC = () => {

    return (
      <Box
        bg={useColorModeValue('white', 'gray.700')}
        h={14}
        as='nav'
        boxShadow={useColorModeValue('sm', 'none')}
      >
        <Container h='full' maxW='container.lg' mx='auto'>

          <Flex
            h='full'
            alignItems={'center'}
            justify={'space-between'}
          >

            <NextLink href='/' passHref>
              <Link
                color={useColorModeValue('orange.500', 'orange.400')}
                fontWeight={600}
                _hover={{ textDecoration: 'none', color: useColorModeValue('orange.600', 'orange.300') }}
                _focus={{ border: '2px solid', borderColor: useColorModeValue('orange.500', 'orange.400') }}
                fontSize='lg'
              >
                <Flex gap={1} alignItems={'center'}>
                  <Icon as={MdQuestionAnswer} />
                  <Text>ForumBase</Text>
                </Flex>
              </Link>
            </NextLink>

            <MenuButton />

          </Flex>
        </Container>
      </Box>
    );
};

export default Navbar;
