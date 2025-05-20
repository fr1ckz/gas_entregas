import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function HomeScreen() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [quantidadeBotijoes, setQuantidadeBotijoes] = useState("");
  const [endereco, setEndereco] = useState("");

  interface Cliente {
    id: string;
    nome: string;
    telefone: string;
    quantidadeBotijoes: string;
    endereco: string;
    entregue: boolean;
  }

  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    carregarClientes();
  }, []);

  const salvarClientesManual = async (clientesParaSalvar: Cliente[]) => {
    try {
      await AsyncStorage.setItem("@clientes", JSON.stringify(clientesParaSalvar));
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };

  const carregarClientes = async () => {
    try {
      const data = await AsyncStorage.getItem("@clientes");
      if (data !== null) {
        setClientes(JSON.parse(data));
      }
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    }
  };

  const adicionarCliente = () => {
    if (
      !nome ||
      !telefone ||
      !quantidadeBotijoes ||
      !endereco ||
      isNaN(Number(quantidadeBotijoes))
    ) {
      Alert.alert("Preencha todos os campos corretamente.");
      return;
    }

    const novoCliente: Cliente = {
      id: String(Date.now()),
      nome,
      telefone,
      quantidadeBotijoes,
      endereco,
      entregue: false,
    };

    const novosClientes = [...clientes, novoCliente];
    setClientes(novosClientes);
    salvarClientesManual(novosClientes);

    setNome("");
    setTelefone("");
    setQuantidadeBotijoes("");
    setEndereco("");
  };

  const marcarComoEntregue = (id: string) => {
    const atualizados = clientes.map((c) =>
      c.id === id ? { ...c, entregue: true } : c
    );
    setClientes(atualizados);
    salvarClientesManual(atualizados);
  };

  const cancelarPedido = (id: string) => {
    const atualizados = clientes.filter((c) => c.id !== id);
    setClientes(atualizados);
    salvarClientesManual(atualizados);
  };


  const fecharDia = () => {
    if (Platform.OS === "web") {

      if (window.confirm("Deseja apagar todos os pedidos?")) {
        confirmarFechamentoDoDia();
      }
    } else {

      Alert.alert(
        "Fechar o Dia",
        "Deseja apagar todos os pedidos?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Apagar",
            onPress: confirmarFechamentoDoDia,
          },
        ],
        { cancelable: true }
      );
    }
  };

  const confirmarFechamentoDoDia = async () => {
    try {
      if (Platform.OS === "web") {
        if (window.confirm("Pedidos entregues " + pedidosEntregues.length + "\nBotijões entregues: " + totalBotijoesEntregues)) {
        }
      } else {

        Alert.alert(
          "Pedidos entregues " + pedidosEntregues.length,
          "Botijões entregues: " + totalBotijoesEntregues,
          [
            {
              text: "OK",
              style: "cancel",
            },

          ],
        );
      }
      await AsyncStorage.removeItem("@clientes");
      setClientes([]);
      Alert.alert("Sucesso", "Todos os pedidos foram apagados!");
    } catch (error) {
      console.error("Erro ao apagar os pedidos:", error);
      Alert.alert("Erro", "Não foi possível apagar os pedidos.");
    }
  };

  const pedidosPendentes = clientes.filter((c) => !c.entregue);
  const pedidosEntregues = clientes.filter((c) => c.entregue);
  const totalBotijoesEntregues = pedidosEntregues.reduce(
    (soma, c) => soma + parseInt(c.quantidadeBotijoes),
    0
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.tituloTexto}>Cadastro de Clientes</Text>

        <TouchableOpacity
          style={styles.fecharBtn}
          onPress={fecharDia}
        >
          <Text style={styles.fecharBtnTexto}>🧾 Fechar o Dia</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea}>
        <TextInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />
        <TextInput
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <TextInput
          placeholder="Quantidade de botijões"
          value={quantidadeBotijoes}
          onChangeText={setQuantidadeBotijoes}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Endereço"
          value={endereco}
          onChangeText={setEndereco}
          style={styles.input}
        />

        <TouchableOpacity style={styles.botao} onPress={adicionarCliente}>
          <Text style={styles.botaoTexto}>➕ Adicionar Cliente</Text>
        </TouchableOpacity>

        <Text style={styles.tituloTexto}>📋 Pedidos</Text>

        {clientes.map((cliente) => (
          <View key={cliente.id} style={styles.clienteBox}>
            <Text style={styles.clienteNome}>🧑 {cliente.nome}</Text>
            <Text style={styles.clienteInfo}>📞 {cliente.telefone}</Text>
            <Text style={styles.clienteInfo}>🛢️ {cliente.quantidadeBotijoes}</Text>
            <Text style={styles.clienteInfo}>📍 {cliente.endereco}</Text>

            {!cliente.entregue ? (
              <>
                <TouchableOpacity
                  style={styles.entregueBtn}
                  onPress={() => marcarComoEntregue(cliente.id)}
                >
                  <Text style={styles.entregueBtnTexto}>✅ Entregue</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelarBtn}
                  onPress={() => cancelarPedido(cliente.id)}
                >
                  <Text style={styles.cancelarBtnTexto}>❌ Cancelar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text style={styles.textoEntregue}>✅ Pedido entregue</Text>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.resumo}>
        <Text style={styles.resumoTexto}>📦 Pendentes: {pedidosPendentes.length}</Text>
        <Text style={styles.resumoTexto}>✅ Entregues: {pedidosEntregues.length}</Text>
        <Text style={styles.resumoTexto}>🛢️ Botijões entregues: {totalBotijoesEntregues}</Text>
      </View>
    </View>
  );
}
