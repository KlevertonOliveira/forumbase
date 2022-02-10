import type { AppProps } from 'next/app';

import { AuthContextProvider } from '../context/AuthContext';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
