import { extendTheme } from '@chakra-ui/react';
export const colorMode = extendTheme({
  initialColorMode: 'dark',
});
export const myTheme = extendTheme({
  colors: {
    title: '#493085',
    text: '#0e0e0e',
    bg: '#f0f0f0',
    main: '#493085',
    contrast: '#FFFCDB',
    overlay: 'rgba(0,0,0,0.3)',
  },
  breakpoints: {
    sm: '40rem', //640px
    md: '48rem', //768px
    lg: '64rem', //1024px
    xl: '80rem', //1280px
    '2xl': '96rem', //1536px
  },
});
