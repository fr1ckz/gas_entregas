import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#f2f2f2",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  tituloTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  scrollArea: {
    paddingBottom: 100,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  botao: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  clienteBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  clienteNome: {
    fontWeight: "bold",
    fontSize: 16,
  },
  clienteInfo: {
    fontSize: 14,
    marginVertical: 2,
  },
  entregueBtn: {
    backgroundColor: "#4CAF50",
    padding: 8,
    marginTop: 8,
    borderRadius: 6,
  },
  entregueBtnTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  cancelarBtn: {
    backgroundColor: "#f44336",
    padding: 8,
    marginTop: 5,
    borderRadius: 6,
  },
  cancelarBtnTexto: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  resumo: {
    backgroundColor: "#b0b3b8",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },
  resumoTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 2,
  },
  fecharBtn: {
    backgroundColor: "#ff5555",
    padding: 8,
    borderRadius: 6,
  },
  fecharBtnTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  textoEntregue: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 10,
  },

});
