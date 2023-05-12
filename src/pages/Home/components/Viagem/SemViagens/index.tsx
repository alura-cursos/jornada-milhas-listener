import { Image, Text, View } from 'react-native';
import styles from './styles';
import semViagens from 'assets/sem-viagens.png';

export default function SemViagens() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Ops!
      </Text>
      <Text style={styles.primaryText}>
        Não temos pacotes disponíveis para sua busca.
      </Text>
      <Text style={styles.secondaryText}>
        Selecione outras localidades ou datas e tente novamente. Só não vá deixar de viajar, viu? {':)'}
      </Text>
      <Image source={semViagens} />
    </View>
  )
}