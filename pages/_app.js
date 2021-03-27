import { AuthProvider } from '../src/providers/auth-provider/Auth-provider';
import { ToastProvider } from 'react-toast-notifications';
import { customTheme } from '../src/utils/theme';
import '../src/styles/style.css';
import { ChakraProvider } from '@chakra-ui/react';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={4000}
        placement="top-right"
      >
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ToastProvider>
    </ChakraProvider>
  );
};

export default MyApp;
