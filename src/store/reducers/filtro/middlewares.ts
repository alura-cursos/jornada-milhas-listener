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

    api.unsubscribe();
  }
});

filtroListener.startListening({
  matcher: endpoints.getViagens.matchFulfilled,
  effect: async (action, api) => {
    const quantidadeViagens = action.payload.viagens.length;

    const textoViagem = `viage${quantidadeViagens > 1 ? 'ns' : 'm'}`;
    const textoBuscado = `buscada${quantidadeViagens > 1 ? 's' : ''}`;

    if (quantidadeViagens >= 1) {
      api.dispatch(criarSnackbar({
        mensagem: `${quantidadeViagens} ${textoViagem} ${textoBuscado} com sucesso!`
      }));
    } else {
      api.dispatch(criarSnackbar({
        mensagem: 'Nenhuma viagem encontrada',
        tipo: 'warning',
      }))
    }
  }
})