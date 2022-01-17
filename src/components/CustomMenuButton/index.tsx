import { FC } from "react";

import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

import { Menu, MenuButton, Button, Avatar, IconButton, MenuList, MenuItem, useColorModeValue, Icon, useColorMode, useToast } from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons';
import { GiArchiveRegister } from 'react-icons/gi';
import { GoSignOut, GoSignIn } from 'react-icons/go';
import { FaMoon, FaSun } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';

type CustomMenuButtonProps = {
  avatarSize: 'sm' | 'md';
};

const CustomMenuButton: FC<CustomMenuButtonProps> = ({ avatarSize }) => {

  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const toast = useToast();

  async function handleLogOut() {
    try {
      await logout();
      router.replace('/');

    } catch (error) {
      console.log(error);
      toast({
        title: 'Error!',
        description: "Error when trying to log out. Please, try again.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }

  /* Special styles from Chakra (for light/dark mode) */

  const { toggleColorMode } = useColorMode();
  const menuButtonBg = useColorModeValue('white', 'transparent');
  const menuButtonBgHover = useColorModeValue('gray.50', 'gray.800');
  const menuButtonTextColor = useColorModeValue('gray.900', 'white');
  const menuButtonBorder = useColorModeValue('mainGray.100', 'gray.600');

  return (
    <Menu closeOnBlur>
      {
        !!currentUser ?

          (
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
            >
              <Avatar
                size={avatarSize}
                src={currentUser.photoURL!}
                name={currentUser.email![0]}
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
              color={menuButtonTextColor}
              bg={menuButtonBg}
              _hover={{ backgroundColor: menuButtonBgHover }}
              border='2px solid'
              borderColor={menuButtonBorder} />
          )
      }

      <MenuList>
        <MenuItem
          icon={useColorModeValue(<Icon as={FaMoon} />, <Icon as={FaSun} />)}
          onClick={toggleColorMode}
        >
          Change Theme
        </MenuItem>

        {
          router.pathname !== '/' &&
          <MenuItem
            icon={<Icon as={IoHome} />}
            onClick={() => { router.push('/'); }}
          >
            Go to Home
          </MenuItem>
        }

        {!!currentUser &&
          <MenuItem onClick={handleLogOut}>
            <Icon as={GoSignOut} mr={2} />
            Log Out
          </MenuItem>
        }

        {
          !currentUser && router.pathname !== '/login' &&
          <MenuItem onClick={() => { router.push('/login'); }}>
            <Icon as={GoSignIn} mr={2} />
            Log In
          </MenuItem>
        }

        {
          !currentUser && router.pathname !== '/signup' &&
          <MenuItem onClick={() => { router.push('/signup'); }}>
            <Icon as={GiArchiveRegister} mr={2} />
            Sign Up
          </MenuItem>
        }
      </MenuList>
    </Menu>
  );
};

export default CustomMenuButton;