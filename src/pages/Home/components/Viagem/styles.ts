import { StyleSheet } from "react-native";
import theme from "src/config/theme";

const styles = StyleSheet.create({
  viagensTitulo: {
    fontSize: 25,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  viagens: {
    gap: 20,
    paddingHorizontal: 20,
  },
  viagemContainer: {
    backgroundColor: theme.colors.tertiary,
    borderColor: theme.colors.lightGrey,
    borderWidth: 1,
    borderRadius: 10,
  },
  viagemImagem: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 260,
    width: "100%",
  },
  viagemDescricao: {
    gap: 15,
    padding: 20,
  },
  detalheTitulo: {
    fontWeight: 'bold'
  },
  viagemTitulo: {
    color: theme.colors.primary,
    fontSize: 25,
  },
  viagemDetalhes: {
    flex: 1,
    gap: 10,
  },
  verDetalhes: {
    marginHorizontal: 30,
    marginBottom: 10,
  },
  viagemValorContainer: {
    justifyContent: "flex-end",
  },
  viagemValor: {
    color: theme.colors.grey,
    fontSize: 25,
    textAlign: "center",
  },
});

export default styles;
