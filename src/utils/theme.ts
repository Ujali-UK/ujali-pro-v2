import { extendTheme } from '@chakra-ui/react';

export const customTheme = extendTheme({
  colors: {
    brand: {
      orange: '#FF9717',
      gray: '#707070',
    },
  },
  styles: {
    global: {
      'html, body': {
        lineHeight: 'tall',
        color: '#707070',
      },
      a: {
        textDecoration: 'none',
      },
    },
  },
});
