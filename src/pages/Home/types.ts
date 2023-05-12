import { TipoViagem } from 'src/types/viagem'

export interface Filtros {
  tipo?: TipoViagem,
  pessoas: 1 | 2 | 3 | undefined,
  origem: string,
  destino: string,
  filtrarPorUsuario: 'cidade' | 'estado' | 'todas',
  dataIda?: string,
  dataVolta?: string
}