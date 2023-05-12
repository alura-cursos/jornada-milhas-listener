import { StyleSheet } from "react-native";
import theme from "src/config/theme";

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    fontSize: 45,
    color: theme.colors.primary
  },
  primaryText: {
    fontSize: 32,
    color: theme.colors.primary,
    textAlign: 'center'
  },
  secondaryText: {
    fontSize: 22,
    color: theme.colors.black,
    marginBottom: 32,
    textAlign: 'center'
  },
});

export default styles;
