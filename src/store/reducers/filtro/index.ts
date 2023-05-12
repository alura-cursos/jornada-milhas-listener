import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Filtros } from 'src/pages/Home/types';

interface InitialState extends Filtros {
  destinos: string[],
  origens: string[]
}

const initialState: InitialState = {
  destinos: [],
  origens: [],
  tipo: undefined,
  pessoas: undefined,
  origem: '',
  destino: '',
  dataIda: undefined,
  dataVolta: undefined,
  filtrarPorUsuario: 'todas',
}

const filtroSlice = createSlice({
  initialState,
  name: "filtro",
  reducers: {
    mudarFiltro: (state, { payload }: PayloadAction<Partial<InitialState>>) => {
      Object.assign(state, payload);
    },
    resetarFiltros: (state) => {
      Object.assign(state, initialState,  { destinos: state.destinos, origens: state.origens })
    }
  },
});


export const { mudarFiltro, resetarFiltros } = filtroSlice.actions;

export default filtroSlice.reducer;