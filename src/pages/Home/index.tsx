import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';

import banner from 'assets/home/banner.png';
import { RootStackParamList } from 'src/routes';

import Viagem from './components/Viagem';
import Filtros from './components/Filtros';

import styles from './styles';

export default function Home(props: DrawerScreenProps<RootStackParamList, "Home">) {

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={banner} style={styles.bannerImage} />
        </View>
        <View style={styles.content}>
          <Filtros />
          <Viagem />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
