import { FC } from "react";
import { useRouter } from 'next/router';

import { Menu, MenuButton as ChakraMenuButton, Button, Avatar, MenuList, MenuItem, useColorModeValue, Icon, useColorMode, Flex, useBreakpointValue } from '@chakra-ui/react';

import { FaMoon, FaSun } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import { IoHome } from 'react-icons/io5';

const MenuButton: FC = () => {

  const { toggleColorMode } = useColorMode();
  const router = useRouter();

  const avatarSize = useBreakpointValue({ base: 'sm', sm: 'md' });

  return (
    <Flex justifyContent={`flex-end`}>
      <Menu closeOnBlur>
        <ChakraMenuButton
          as={Button}
          rounded={'full'}
          variant={'link'}
          cursor={'pointer'}
          minW={0}
          m={2}
        >
          <Avatar
            size={avatarSize}
            src={'/images/user.jpg'}
          />
        </ChakraMenuButton>

        <MenuList>
          <MenuItem
            icon={useColorModeValue(<Icon as={FaMoon} />, <Icon as={FaSun} />)}
            onClick={toggleColorMode}
          >
            Change Theme
          </MenuItem>

          <MenuItem
            icon={<Icon as={BiArrowBack} />}
            onClick={() => { router.back(); }}
          >
            Go to Last Page
          </MenuItem>

          <MenuItem
            icon={<Icon as={IoHome} />}
            onClick={() => { router.replace('/'); }}
          >
            Go to Home
          </MenuItem>
        </MenuList>

      </Menu>
    </Flex>
  );
};

export default MenuButton;