import { FC, ReactNode } from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import Navbar from '../Navbar';

type LayoutProps = {
    children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <Flex 
            direction={'column'}
            minH={'100vh'}
        >
            <header>
                <Navbar />
            </header>

            <Flex
                as='main'
                flex={1}
            >
                <Box flex={1} bg={useColorModeValue('mainGray.100', 'transparent')}>
                    {children}
                </Box>
            </Flex>
        </Flex>
    )
}

export default Layout
