import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InitialState } from './type';
import { mudarFiltro } from '../filtro';

const initialState: InitialState = {
  paginaAtual: 1,
}

const viagemSlice = createSlice({
  initialState,
  name: "viagem",
  reducers: {
    mudarPagina: (state, { payload }: PayloadAction<number>) => { state.paginaAtual = payload },
  },
  extraReducers: builder => 
  builder.addCase(mudarFiltro, (state) => { state.paginaAtual = 1 })
});

export const { mudarPagina } = viagemSlice.actions;

export default viagemSlice.reducer;