import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { Provider as RNPProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Routes from 'src/routes';
import theme from 'src/config/theme';
import store from 'src/store';
import { SnackbarProvider } from 'src/contexts/Snackbar';

export default function App() {
  return (
    <Provider store={store}>
      <RNPProvider theme={theme}>
        <SnackbarProvider>
          <NavigationContainer>
            <StatusBar />
            <Routes />
          </NavigationContainer>
        </SnackbarProvider>
      </RNPProvider>
    </Provider>
  );
}