import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ValueOf } from 'react-native-gesture-handler/lib/typescript/typeUtils';
import { baseUrl } from 'src/config/api';
import { Filtros } from 'src/pages/Home/types';
import { Viagem } from 'src/types/viagem';

export const viagensApi = createApi({
  reducerPath: 'viagensApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: builder => ({
    getViagens: builder
      .query<{ paginaAtual: number, totalPaginas: number, viagens: Viagem[] }, { pagina: string } & Partial<Filtros>>(
        {
          query: (obj: { pagina: string } & Partial<Filtros>) => {
            const { ...filtros } = obj;
            const normalizeObj: Record<string, string> = {}
            Object.keys(filtros).forEach((filtro: string) => {
              const value: ValueOf<Filtros> = filtros[filtro as keyof typeof filtros];
              if(value !== undefined) normalizeObj[filtro] = String(value);
            })
            const queryParams = new URLSearchParams(normalizeObj).toString();
            return `viagens?${queryParams}`;
          }
        }
      )
  })
})

export const { useGetViagensQuery, useLazyGetViagensQuery, endpoints, util } = viagensApi;