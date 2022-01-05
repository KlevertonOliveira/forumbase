import { HamburgerIcon } from '@chakra-ui/icons';
import { Menu, MenuButton as ChakraMenuButton, Button, Avatar, IconButton, MenuList, MenuItem, useColorModeValue, Icon, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, useState } from "react";
import { GiArchiveRegister } from 'react-icons/gi';
import { GoSignOut, GoSignIn } from 'react-icons/go';

import { FaMoon, FaSun } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';

const MenuButton: FC = () => {

  const [isLogged, setIsLogged] = useState(false);
  const { toggleColorMode } = useColorMode();
  const router = useRouter();

  /* Special styles for (light/dark mode) */
  const menuButtonBg = useColorModeValue('white', 'transparent');
  const menuButtonBgHover = useColorModeValue('gray.50', 'gray.800');
  const menuButtonTextColor = useColorModeValue('gray.900', 'white');
  const menuButtonBorder = useColorModeValue('mainGray.100', 'gray.600');

  return (
    <Menu closeOnBlur>
      {
        isLogged ?

          (
            <ChakraMenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
            >
              <Avatar
                size={'sm'}
                src={'/images/user.jpg'}
              />
            </ChakraMenuButton>
          )

          :

          (
            <ChakraMenuButton
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

        {isLogged &&
          <MenuItem>
            <Icon as={GoSignOut} mr={2} />
            Log Out
          </MenuItem>
        }

        {
          !isLogged && router.pathname !== '/login' &&
          <MenuItem onClick={() => { router.push('/login'); }}>
            <Icon as={GoSignIn} mr={2} />
            Log In
          </MenuItem>
        }

        {
          !isLogged && router.pathname !== '/signup' &&
          <MenuItem onClick={() => { router.push('/signup'); }}>
            <Icon as={GiArchiveRegister} mr={2} />
            Sign Up
          </MenuItem>
        }
      </MenuList>
    </Menu>
  );
};

export default MenuButton;