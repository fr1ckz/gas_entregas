import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: "#f9f9f9",
  },
  scrollArea: {
    paddingBottom: 140, // espaço pro resumo fixo
  },
  tituloTexto: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
  },
  botao: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  clienteBox: {
    backgroundColor: "#d6d4ce",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    marginLeft: '5%',
    marginRight: '5%',
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  clienteNome: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  clienteInfo: {
    fontSize: 14,
    color: "#555",
  },
  cancelarBtn: {
    marginTop: 10,
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  cancelarBtnTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
  resumo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginLeft: '20%',
    marginRight: '20%',
    marginBottom: 20,
    paddingVertical: 16,
    backgroundColor: "#dae0e0",
    borderWidth: 3,
    borderRadius: 25,
    borderColor: "#000",
    alignItems: "center",
  },
  resumoTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  }, entregueBtn: {
    marginTop: 8,
    backgroundColor: "#007bff",
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  entregueBtnTexto: {
    color: "#fff",
    fontWeight: "bold",
  },

});
