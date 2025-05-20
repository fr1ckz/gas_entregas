import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
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

  useEffect(() => {
    salvarClientes();
  }, [clientes]);

  const salvarClientes = async () => {
    try {
      const json = JSON.stringify(clientes);
      await AsyncStorage.setItem("@clientes", json);
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };

  const carregarClientes = async () => {
    try {
      const json = await AsyncStorage.getItem("@clientes");
      if (json !== null) {
        setClientes(JSON.parse(json));
      }
    } catch (error) {
      console.error("Erro ao carregar os dados:", error);
    }
  };

  const adicionarCliente = () => {
    if (!nome || !telefone || !quantidadeBotijoes || !endereco || isNaN(Number(quantidadeBotijoes))) {
      Alert.alert("Preencha todos os campos corretamente!");
      return;
    }

    const novoCliente: Cliente = {
      id: String(new Date().getTime()),
      nome,
      telefone,
      quantidadeBotijoes,
      endereco,
      entregue: false,
    };

    setClientes((prev) => [...prev, novoCliente]);
    setNome("");
    setTelefone("");
    setQuantidadeBotijoes("");
    setEndereco("");
  };

  const marcarComoEntregue = (id: string) => {
    setClientes((prev) =>
      prev.map((cliente) =>
        cliente.id === id ? { ...cliente, entregue: true } : cliente
      )
    );
  };

  const cancelarPedido = (id: string) => {
    setClientes((prev) => prev.filter((cliente) => cliente.id !== id));
  };

  const totalEntregues = clientes.filter((c) => c.entregue).length;
  const totalBotijoesEntregues = clientes
    .filter((c) => c.entregue)
    .reduce((total, c) => total + parseInt(c.quantidadeBotijoes), 0);

  const pedidosPendentes = clientes.filter((c) => !c.entregue);

  return (
    <View style={styles.container}>
      <Text style={styles.tituloTexto}>Cadastro de Clientes</Text>

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
            <Text style={styles.clienteInfo}>🛢️ {cliente.quantidadeBotijoes} botijões</Text>
            <Text style={styles.clienteInfo}>📍 {cliente.endereco}</Text>

            {!cliente.entregue && (
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
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.resumo}>
        <Text style={styles.resumoTexto}>📦 Pendentes: {pedidosPendentes.length}</Text>
        <Text style={styles.resumoTexto}>✅ Entregues: {totalEntregues}</Text>
        <Text style={styles.resumoTexto}>🛢️ Botijões entregues: {totalBotijoesEntregues}</Text>
      </View>
    </View>
  );
}
