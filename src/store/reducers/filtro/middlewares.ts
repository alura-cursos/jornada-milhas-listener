import { createListenerMiddleware } from '@reduxjs/toolkit';
import { baseUrl } from 'src/config/api';
import { mudarFiltro } from './index';

export const filtroListener = createListenerMiddleware();

filtroListener.startListening({
  type: 'viagensApi/executeQuery/fulfilled',
  effect: async (action, api) => {
    const origens = await (await fetch(`${baseUrl}origens`)).json();
    const destinos = await (await fetch(`${baseUrl}destinos`)).json();

    api.dispatch(mudarFiltro({
      origens,
      destinos
    }))
  }
})