import { AuthProvider } from '../src/providers/auth-provider/Auth-provider';
import { ToastProvider } from 'react-toast-notifications';
import { ThemeProvider } from '@material-ui/core/styles';
import { customTheme } from '../src/utils/theme';
import '../src/styles/style.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={4000} placement="top-right">
      <ThemeProvider theme={customTheme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </ToastProvider>
  );
};

export default MyApp;
