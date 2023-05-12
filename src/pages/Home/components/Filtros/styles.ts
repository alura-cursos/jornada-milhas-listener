import { StyleSheet } from "react-native";
import theme from "src/config/theme";

const styles = StyleSheet.create({
  passagensContent: {
    marginBottom: 30,
    padding: 20,
  },
  passagensTitulo: {
    fontSize: 25,
    marginBottom: 30,
  },
  tipoContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tipoIda: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  tipoIdaEVolta: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  tipoSelecionado: {
    backgroundColor: theme.colors.secondary,
  },
  pessoasPicker: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    marginVertical: 10,
  },
  origemContainer: {
    width: "100%",
  },
  origem: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  trocar: {
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    borderRadius: 0,
    height: 30,
    justifyContent: "center",
  },
  destino: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  datas: {
    gap: 10,
    marginVertical: 10,
  },
  viagemPor: {
    marginBottom: 10,
    backgroundColor: theme.colors.secondary
  },
  buscarContainer: {
    flexDirection: "row",
    gap: 50,
    justifyContent: "space-between",
    marginTop: 10,
  },
  botaoResetarBusca: {
    backgroundColor: theme.colors.accent,
    flex: 2,
  },
  botaoBuscar: {
    flex: 1,
  },
  inputDisabled: {
    opacity: 0.8,
  },
});

export default styles;
