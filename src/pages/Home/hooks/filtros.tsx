import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { mudarFiltro } from 'src/store/reducers/filtro';
import { TipoViagem } from 'src/types/viagem';
import { Filtros } from '../types';
import { ValueOf } from 'react-native-gesture-handler/lib/typescript/typeUtils';

const useFiltros = () => {
  const usuarioLogado = useAppSelector(state => state.usuario.usuarioLogado);
  const { destinos, origens, ...filtros } = useAppSelector(state => state.filtro);
  const dispatch = useAppDispatch();
  
  const mostrarTodasAsViagens = filtros.filtrarPorUsuario === 'todas';
  const mostrarViagensPorCidade = filtros.filtrarPorUsuario === 'cidade';
  const mostrarViagensPorEstado = filtros.filtrarPorUsuario === 'estado';

  const trocarOrigemDestino = () => 
    dispatch(mudarFiltro({ origem: filtros.destino, destino: filtros.origem }));

  const trocarTipo =
    (novoTipo: TipoViagem) =>
      () => dispatch(mudarFiltro({ tipo: novoTipo === filtros.tipo ? undefined : novoTipo }));

  const handleFiltrarPorUsuario = (
    novoFiltroPorUsuario: Filtros['filtrarPorUsuario']
  ) => () => {
    const novaOrigem = novoFiltroPorUsuario === 'cidade' ? usuarioLogado?.cidade : usuarioLogado?.estado;
    const deveFiltrarPorUsuario = mostrarTodasAsViagens || novaOrigem !== filtros.origem;
    dispatch(mudarFiltro({
      filtrarPorUsuario: deveFiltrarPorUsuario ? novoFiltroPorUsuario : 'todas',
      origem: deveFiltrarPorUsuario ? novaOrigem : ''
    }));
  }
    
  const handleFiltro =
    <K extends keyof Filtros>(filtro: K) =>
      (valor: ValueOf<Filtros>) =>
        dispatch(mudarFiltro({ [filtro]: valor }));

  return {
    trocarOrigemDestino,
    trocarTipo,
    handleFiltrarPorUsuario,
    handleFiltro,
    mostrarTodasAsViagens,
    mostrarViagensPorCidade,
    mostrarViagensPorEstado
  }
}

export default useFiltros;