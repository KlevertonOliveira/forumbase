import { FC } from "react";
import { Box, Button, Flex, HStack, Icon, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { BiArrowBack } from 'react-icons/bi';
import { IoHome } from 'react-icons/io5';
import { useRouter } from 'next/router';

const NavigationButtons: FC = () => {

  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();

  return (

    <Flex
      justifyContent={'space-between'}
      alignItems={'flex-start'}
      mx={1}
      mt={1}
    >
      <HStack spacing={1} p={1}>
        <Button
          title='Return to previous page'
          h={10}
          w={10}
          fontSize={'xl'}
          rounded={'full'}
          colorScheme={'green'}
          onClick={() => { router.back(); }}
        >
          <Icon as={BiArrowBack} />
        </Button>

        <Button
          title='Go to Home'
          h={10}
          w={10}
          fontSize={'xl'}
          rounded={'full'}
          colorScheme={'blue'}
          onClick={() => { router.replace('/'); }}
        >
          <Icon as={IoHome} />
        </Button>
      </HStack>

      <Box p={1}>
        <Button
          title='Toggle Theme'
          aria-label='Toggle Theme'
          h={10}
          w={10}
          fontSize={colorMode === 'light' ? 'lg' : 'xl'}
          rounded={'full'}
          bg={useColorModeValue('gray.200', 'gray.700')}
          _hover={{
            backgroundColor: useColorModeValue('gray.300', 'gray.600')
          }}
          onClick={toggleColorMode}
        >
          {colorMode === 'light' ? <Icon as={FaMoon} /> : <Icon as={FaSun} />}
        </Button>
      </Box>
    </Flex>
  );
};

export default NavigationButtons;