import { StyleSheet } from 'react-native';
import theme from 'src/config/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10
  },
  page: {
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    borderRadius: 3,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  pageText: {
    color: 'black',
  },
  pageActive: {
    backgroundColor: theme.colors.primary
  },
  pageTextActive: {
    color: 'white'
  }
})

export default styles;