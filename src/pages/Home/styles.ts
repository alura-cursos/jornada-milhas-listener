import { StyleSheet } from "react-native";
import theme from "src/config/theme";

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    height: 400,
    position: "relative",
    width: "100%",
  },
  bannerImage: {
    width: "100%",
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  viagensTitulo: {
    fontSize: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  error: {
    backgroundColor: theme.colors.error
  },
  info: {
    backgroundColor: theme.colors.info
  },
  success: {
    backgroundColor: theme.colors.success
  },
  warning: {
    backgroundColor: theme.colors.warning
  },
});

export default styles;
