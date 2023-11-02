import { createListenerMiddleware } from '@reduxjs/toolkit';
import { baseUrl } from 'src/config/api';
import { mudarFiltro } from './index';
import { endpoints } from '../viagem/middlewares';
import { criarSnackbar, deletarSnackbar } from '../snackbar';
import uuid from 'react-native-uuid';

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
});

filtroListener.startListening({
  matcher: endpoints.getViagens.matchPending,
  effect: async (action, api) => {
    const id = String(uuid.v4());
    api.dispatch(criarSnackbar({
      mensagem: 'buscando viagem',
      tipo: 'info',
      id
    }));

    const tarefa = api.fork(async (forkApi) => {
      await forkApi.delay(2000);
    });

    const resultado = await tarefa.result;

    if (resultado.status === 'ok') {
      api.dispatch(deletarSnackbar(id));
    }
  }
})