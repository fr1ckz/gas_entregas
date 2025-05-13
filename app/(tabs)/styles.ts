import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 10,
    width: '100%',
    height: 250,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 15,
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  resumo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  resumoTexto: {
    fontSize: 16,
    fontWeight: "bold",
  },
  texto: {
    fontSize: 15,
  },
  cliente: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
  },

  clienteBox: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  clienteNome: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  clienteInfo: {
    fontSize: 14,
  },



});
