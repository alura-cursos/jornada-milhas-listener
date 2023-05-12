import { PropsWithChildren, createContext,  } from 'react';
import { Dimensions, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import styles from './styles';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { deletarSnackbar } from 'src/store/reducers/snackbar';

const SnackbarContext = createContext<null>(null);

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const snackbars = useAppSelector(state => state.snackbar);
  const snackbarIds = Object.keys(snackbars);

  return (
    <SnackbarContext.Provider value={null}>
      <View
        style={{
          position: 'absolute',
          height: 0,
          width: Dimensions.get('screen').width,
          bottom: 0,
          zIndex: 2
        }}
      >
        {snackbarIds.map((snackbarId, index) => {
          return (
            <Snackbar
              key={snackbarId}
              visible
              onDismiss={() => dispatch(deletarSnackbar(snackbarId))}
              duration={snackbars[snackbarId].duracao || 5000}
              theme={{ colors: { inversePrimary: 'white' } }}
              style={[
                {
                  position: 'absolute',
                  bottom: index * 55
                },
                styles[snackbars[snackbarId].tipo || 'success'
                ]]}
            >
              {snackbars[snackbarId].mensagem}
            </Snackbar>
          )
        })}
      </View>
      {children}
    </SnackbarContext.Provider>
  )
}