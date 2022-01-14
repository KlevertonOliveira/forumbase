import { Button, Grid, Heading, useBreakpointValue, useColorModeValue, Text, Box, Image, Flex } from '@chakra-ui/react';
import { NextPage } from "next";
import { useRouter } from 'next/router';

const ErrorPage: NextPage = () => {

  const router = useRouter();

  return (
    <Grid
      as='main'
      minH={'100vh'}
      bg={useColorModeValue('mainGray.200', 'transparent')}
      templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
    >
      <Box
        as='section'
        minH={'full'}
        display={{ base: 'none', lg: 'block' }}
      >
        <Image
          src='/images/404-page.svg'
          alt='An illustration that contains the number 404 below a mountain.'
          boxSize='full'
          bg={'white'}
          p={4}
        />
      </Box>

      <Flex px={4} direction={'column'} alignItems={'center'} justifyContent={'space-evenly'}>
        <Heading
          as='h1'
          textAlign={'center'}
          textTransform={'uppercase'}
          size={useBreakpointValue({ base: 'xl', sm: '2xl' })}
        >
          Page Not Found
        </Heading>

        <Text
          fontWeight={'semibold'}
          fontSize={{ base: 'lg', sm: 'xl' }}
          textAlign={'center'}
        >
          Ops! The page you were looking for doesn't exist.
        </Text>

        <Button
          variant='primary'
          maxW='max-content'
          onClick={() => router.push('/')}
        >
          Return to Home
        </Button>
      </Flex>
    </Grid>
  );
};

export default ErrorPage;