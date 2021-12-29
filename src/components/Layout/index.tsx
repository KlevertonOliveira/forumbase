import { Box, Flex } from '@chakra-ui/react';
import {ReactNode} from 'react';
import Navbar from '../Navbar';

const Layout = ({children}:{children:ReactNode}) => {
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
                <Box flex={1}>
                    {children}
                </Box>
            </Flex>
        </Flex>
    )
}

export default Layout
