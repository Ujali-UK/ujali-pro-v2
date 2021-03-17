import { AuthProvider } from '../src/providers/auth-provider/Auth-provider';
import { ToastProvider } from 'react-toast-notifications';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const MyApp = ({ Component, pageProps }) => {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={4000} placement="top-right">
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </ToastProvider>
  );
};

export default MyApp;
