import { createListenerMiddleware } from '@reduxjs/toolkit';
import { baseUrl } from 'src/config/api';
import { mudarFiltro } from './index';
import { endpoints } from '../viagem/middlewares';
import { criarSnackbar } from '../snackbar';

export const filtroListener = createListenerMiddleware();

filtroListener.startListening({
  matcher: endpoints.getViagens.matchFulfilled,
  effect: async (action, api) => {
    const [origens, destinos] = await Promise.all([
      fetch(`${baseUrl}origens`),
      (await fetch(`${baseUrl}destinos`)).json()
    ]);

    api.dispatch(mudarFiltro({
      origens: await origens.json(),
      destinos
    }));
    
    const quantidadeViagens = action.payload.viagens.length;

    api.dispatch(criarSnackbar({
      mensagem: `${quantidadeViagens} viage${quantidadeViagens > 1 ? 'ns' : 'm'} buscada com sucesso!`
    }));

    api.unsubscribe();
  }
})