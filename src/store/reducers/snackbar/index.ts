import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

type TiposSnackbar = 'success' | 'error' | 'info' | 'warning';

interface Snackbar {
  mensagem: string,
  tipo?: TiposSnackbar,
  duracao?: number
}

interface InitialState {
  [key: string]: Snackbar
}

const initialState: InitialState = {}

const snackbarSlice = createSlice({
  initialState,
  name: "filtro",
  reducers: {
    criarSnackbar: (state, { payload }: PayloadAction<Snackbar & { id?: string }>) => {
      const { id, ...snackbar } = payload;
      state[id || String(uuid.v4())] = snackbar;
    },
    deletarSnackbar: (state, { payload }: PayloadAction<string>) => {
      delete state[payload];
    }
  },
});


export const { criarSnackbar, deletarSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;