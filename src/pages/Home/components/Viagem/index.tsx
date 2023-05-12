import { Image, Text, View } from 'react-native';
import styles from './styles';
import { Button, Card, Title } from 'react-native-paper';
import Pagination from 'src/components/Pagination';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { imagesUrl } from 'src/config/api';
import { TipoViagem, Viagem as IViagem } from 'src/types/viagem';
import { mudarPagina } from 'src/store/reducers/viagem';
import SemViagens from './SemViagens';
import Loading from './Loading';
import { useGetViagensQuery } from 'src/store/reducers/viagem/middlewares';

export default function Viagem() {
  const dispatch = useAppDispatch();
  const paginaAtual = useAppSelector(state => state.viagem.paginaAtual);
  const { destinos, origens, pessoas = 1, filtrarPorUsuario, ...filtros } = useAppSelector(state => state.filtro);

  const { data, isLoading, isFetching } = useGetViagensQuery({
    pagina: String(paginaAtual),
    ...filtros
  });

  if (isLoading || isFetching) return <Loading />

  return (
    <View style={styles.viagens}>
      {data?.viagens.length === 0 ? <SemViagens /> : (
        <>
          <Title style={styles.viagensTitulo}> Promoções </Title>
          {data?.viagens.map((viagem, index) => (
            <Card key={index} style={styles.viagemContainer}>
              <Image source={{ uri: `${imagesUrl}${viagem.foto}` }} style={styles.viagemImagem} />
              <View style={styles.viagemDescricao}>
                <Title style={styles.viagemTitulo}>{viagem.titulo}</Title>
                <View style={styles.viagemDetalhes}>
                  <Text><Text style={styles.detalheTitulo}>Data de ida: </Text> {viagem.dataIda} </Text>
                  <Text><Text style={styles.detalheTitulo}>Data de volta: </Text>{viagem.dataVolta} </Text>
                  <Text><Text style={styles.detalheTitulo}>Origem: </Text> {viagem.origem} </Text>
                  <Text><Text style={styles.detalheTitulo}>Destino: </Text> {viagem.destino} </Text>
                  <Text><Text style={styles.detalheTitulo}>Tipo: </Text> {viagem.tipo === TipoViagem.ida ? 'ida' : 'ida e volta'} </Text>
                </View>
                <View style={styles.viagemValorContainer}>
                  <Text style={styles.viagemValor}>
                    R$ {
                      (viagem.valor * (filtros.tipo === TipoViagem.idaEVolta ? 2 : 1) * pessoas)
                        .toFixed(2)
                        .replace('.', ',')
                    }
                  </Text>
                </View>
              </View>
              <Button mode='contained' style={styles.verDetalhes}> Ver detalhes </Button>
            </Card>
          ))}
          <Pagination
            totalPages={data?.totalPaginas || 1}
            currentPage={paginaAtual}
            onClick={pagina => dispatch(mudarPagina(pagina))}
          />
        </>
      )}
    </View >
  )
}