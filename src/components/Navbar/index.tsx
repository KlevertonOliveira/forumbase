import React, { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { Avatar, Box, Button, Flex, Icon, Text, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, useColorMode, useColorModeValue } from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons';
import { IoCreate } from 'react-icons/io5';
import { GoSignOut, GoSignIn } from 'react-icons/go';
import { GiArchiveRegister } from 'react-icons/gi';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';
import { MdQuestionAnswer } from 'react-icons/md';

const Navbar = () => {

    const { toggleColorMode } = useColorMode();

    const [isLogged, setIsLogged] = useState(false);

    const menuButtonBg = useColorModeValue('white', 'transparent');

    const router = useRouter();

    return (
        <Box
            bg={useColorModeValue('gray.200', 'gray.700')}
            h={14}
            as='nav'
            boxShadow={useColorModeValue('sm', 'none')}
        >
            <Flex
                alignItems={'center'}
                justify={'space-between'}
                w='90vw'
                h='full'
                mx={'auto'}
            >

                <NextLink href='/' passHref>
                    <Link
                        color={useColorModeValue('orange.500', 'orange.400')}
                        fontWeight={600}
                        _focus={{ border: 'none' }}
                        _hover={{ textDecoration: 'none', color: useColorModeValue('orange.600', 'orange.300') }}
                        fontSize='lg'
                    >
                        <Flex gap={1} alignItems={'center'}>
                            <Icon as={MdQuestionAnswer} />
                            <Text>ForumBase</Text>
                        </Flex>
                    </Link>
                </NextLink>

                <Menu closeOnBlur>
                    {
                        isLogged ?

                            (
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}
                                >
                                    <Avatar
                                        size={'sm'}
                                        src={'/user.jpg'}
                                    />
                                </MenuButton>
                            )

                            :

                            (
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<HamburgerIcon />}
                                    variant='outline'
                                    rounded='full'
                                    bg={menuButtonBg}
                                />
                            )
                    }

                    <MenuList>
                        <MenuItem
                            icon={useColorModeValue(<Icon as={BsFillMoonFill} />, <Icon as={BsSunFill} />)}
                            onClick={toggleColorMode}
                        >
                            Change Theme
                        </MenuItem>

                        {
                            isLogged ?

                                (
                                    <>
                                        <MenuItem>
                                            <Icon as={IoCreate} mr={2} />
                                            Create Post
                                        </MenuItem>

                                        <MenuItem>
                                            <Icon as={GoSignOut} mr={2} />
                                            Log Out
                                        </MenuItem>
                                    </>
                                )

                                :

                                (
                                    <>
                                        <MenuItem onClick={() => { router.push('/login'); }}>
                                            <Icon as={GoSignIn} mr={2} />
                                            Log In
                                        </MenuItem>
                                        <MenuItem onClick={() => { router.push('/signup'); }}>
                                            <Icon as={GiArchiveRegister} mr={2} />
                                            Sign Up
                                        </MenuItem>
                                    </>
                                )
                        }
                    </MenuList>
                </Menu>
            </Flex>
        </Box>
    );
};

export default Navbar;
