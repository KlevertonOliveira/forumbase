import { FC, ReactNode } from 'react';
import { Grid, useColorModeValue } from '@chakra-ui/react';
import Navbar from '../Navbar';

type LayoutProps = {
    children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
      <Grid
        minH={'100vh'}
        bg={useColorModeValue('mainGray.100', 'transparent')}
        templateColumns={'1fr'}
        templateRows={'auto 1fr'}
      >
        <header>
          <Navbar />
        </header>

        <main>
          {children}
        </main>
      </Grid>
    )
}

export default Layout
