import React, { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { Avatar, Box, Button, Flex, Icon, Text, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, useColorMode, useColorModeValue, Container } from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons';
import { IoCreate } from 'react-icons/io5';
import { GoSignOut, GoSignIn } from 'react-icons/go';
import { GiArchiveRegister } from 'react-icons/gi';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';
import { MdQuestionAnswer } from 'react-icons/md';

const Navbar = () => {

    const { toggleColorMode } = useColorMode();

    const [isLogged, setIsLogged] = useState(false);

    const router = useRouter();

    /* Special styles for (light/dark mode) */
    const menuButtonBg = useColorModeValue('#E9F2DA', 'transparent');
    const menuButtonBgHover = useColorModeValue('gray.50', 'gray.800');
    const menuButtonTextColor = useColorModeValue('gray.600', 'white');

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
                                        color={menuButtonTextColor}
                                        _hover={{ backgroundColor: menuButtonBgHover }}
                                        _active={{ backgroundColor: menuButtonBg }}
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
            </Container>
        </Box>
    );
};

export default Navbar;
