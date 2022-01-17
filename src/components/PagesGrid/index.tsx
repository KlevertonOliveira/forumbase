import { FC, ReactNode } from "react";

import CustomMenuButton from '../CustomMenuButton';
import { Image, Box, Flex, Grid, useColorModeValue } from '@chakra-ui/react';

type PagesGridProps = {
  imageSrc: string;
  imageAlt: string;
  changeSectionsOrder?: boolean;
  children: ReactNode;
};

const PagesGrid: FC<PagesGridProps> = ({ imageSrc, imageAlt, changeSectionsOrder, children }) => {
  return (
    <Grid
      as='main'
      minH='100vh'
      templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
    >

      {/* Image Section */}
      <Box
        as='section'
        display={{ base: 'none', lg: 'block' }}
        bg={'white'}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          boxSize='full'
          maxH='100vh'
          p={4}
        />
      </Box>

      {/* Form Section */}
      <Grid
        as='section'
        templateRows={'auto 1fr'}
        order={changeSectionsOrder ? -1 : 1}
        bg={useColorModeValue('mainGray.200', 'transparent')}
      >
        <Flex justifyContent={`flex-end`} my={1} mx={2}>
          <CustomMenuButton avatarSize='md' />
        </Flex>

        {children}

      </Grid>
    </Grid>
  );
};

export default PagesGrid;