'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { myTheme } from '../components/theme/theme';

export function Providers({ children }) {
  return <ChakraProvider theme={myTheme}>{children}</ChakraProvider>;
}
