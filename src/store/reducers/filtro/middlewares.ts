import { createListenerMiddleware } from '@reduxjs/toolkit';

export const filtroListener = createListenerMiddleware();

filtroListener.startListening({
  type: 'viagensApi/executeQuery/fulfilled',
  effect: async () => {
    console.log('escutando!');
  }
})