import { CSSReset, ThemeProvider } from '@chakra-ui/react';
import { AuthProvider } from '../src/config/Auth-context';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <CSSReset />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default MyApp;
