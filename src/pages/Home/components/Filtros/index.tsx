import { View } from 'react-native';
import { Button, Card, Title, TouchableRipple } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import Icon from '@expo/vector-icons/Ionicons';
import DatePicker from 'src/components/DatePicker';
import StringPicker from 'src/components/StringPicker';
import { resetarFiltros } from 'src/store/reducers/filtro';

import { TipoViagem } from 'src/types/viagem';
import useFiltros from '../../hooks/filtros';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import styles from './styles';

export default function Filtros() {
  const dispatch = useAppDispatch();
  const usuarioLogado = useAppSelector(state => state.usuario.usuarioLogado);
  const { destinos, origens, ...filtros } = useAppSelector(state => state.filtro);
  const {
    trocarOrigemDestino,
    trocarTipo,
    handleFiltrarPorUsuario,
    handleFiltro,
    mostrarTodasAsViagens,
    mostrarViagensPorCidade,
    mostrarViagensPorEstado
  } = useFiltros();
  
  const { pessoas, tipo, origem, destino, dataIda, dataVolta } = filtros;
  
  return (
    <Card style={styles.passagensContent}>
      <Title style={styles.passagensTitulo}> Passagens </Title>
      <View style={styles.tipoContainer}>
        <Button
          icon={tipo === TipoViagem.idaEVolta ? 'check' : 'blank'}
          style={[styles.tipoIda, tipo === TipoViagem.idaEVolta && styles.tipoSelecionado]}
          onPress={trocarTipo(TipoViagem.idaEVolta)}
        >
          Ida e volta
        </Button>
        <Button
          icon={tipo === TipoViagem.ida ? 'check' : 'blank'}
          style={[styles.tipoIdaEVolta, tipo === TipoViagem.ida && styles.tipoSelecionado]}
          onPress={trocarTipo(TipoViagem.ida)}
        >
          Somente ida
        </Button>
      </View>
      <View style={styles.pessoasPicker}>
        <Picker selectedValue={pessoas} onValueChange={handleFiltro('pessoas')}>
          <Picker.Item label="Pessoas" value={undefined} />
          <Picker.Item label="1 adulto" value={1} />
          <Picker.Item label="2 adultos" value={2} />
          <Picker.Item label="3 adultos" value={3} />
        </Picker>
      </View>
      <View style={styles.origemContainer}>
        <StringPicker
          value={origem}
          placeholder='Origem'
          editable={mostrarTodasAsViagens}
          selectTextOnFocus={mostrarTodasAsViagens}
          onChangeText={handleFiltro('origem')}
          icon='airplane-takeoff'
          style={[styles.origem, !mostrarTodasAsViagens && styles.inputDisabled]}
          options={origens}
        />
        <TouchableRipple style={styles.trocar} onPress={trocarOrigemDestino}>
          <Icon name='swap-vertical' size={20} color='white' />
        </TouchableRipple>
        <StringPicker
          value={destino}
          placeholder='Destino'
          onChangeText={handleFiltro('destino')}
          icon='airplane-landing'
          style={styles.destino}
          options={destinos}
        />
      </View>
      <View style={styles.datas}>
        <DatePicker
          label='Data de ida'
          value={dataIda || ''}
          onChangeText={handleFiltro('dataIda')}
        />
        <DatePicker
          label='Data de volta'
          value={dataVolta || ''}
          onChangeText={handleFiltro('dataVolta')}
        />
      </View>
      {usuarioLogado?.cidade && (
        <Button
          mode='contained'
          style={styles.viagemPor}
          textColor='black'
          onPress={handleFiltrarPorUsuario('cidade')}
          icon={mostrarViagensPorCidade ? 'check' : ''}
        >
          Viagens na minha cidade
        </Button>
      )}
      {usuarioLogado?.estado && (
        <Button
          mode='contained'
          style={styles.viagemPor}
          textColor='black'
          onPress={handleFiltrarPorUsuario('estado')}
          icon={mostrarViagensPorEstado ? 'check' : ''}
        >
          Viagens no meu estado
        </Button>
      )}
      <View style={styles.buscarContainer}>
        <Button
          mode='contained'
          style={styles.botaoResetarBusca}
          onPress={() => dispatch(resetarFiltros())}
        >
          Resetar busca
        </Button>
      </View>
    </Card>
  )
}