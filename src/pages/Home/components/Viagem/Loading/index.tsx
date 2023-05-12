import { Image, Text, View } from 'react-native';
import styles from './styles';

export default function Loading() {

  return (
    <View style={styles.buscandoContainer}>
      <Text style={styles.buscandoText}>
        Aguarde uns instantes, estamos viajando o mundo das milhas para encontrar a melhor solução pra você!
      </Text>
      <Image
        source={require('assets/buscando.gif')}
        style={{ width: 200, height: 200 }}
      />
    </View>
  )
}