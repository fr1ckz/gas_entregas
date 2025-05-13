import React, { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { styles } from "./styles";

export default function HomeScreen() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [quantidadeBotijoes, setQuantidadeBotijoes] = useState("");

  interface Cliente {
    id: string;
    nome: string;
    telefone: string;
    quantidadeBotijoes: string;
  }

  const [clientes, setClientes] = useState<Cliente[]>([]);

  const adicionarCliente = () => {
    if (!nome || !telefone || !quantidadeBotijoes) return;

    const novoCliente = {
      id: String(new Date().getTime()),
      nome,
      telefone,
      quantidadeBotijoes,
    };

    setClientes((prevClientes) => [...prevClientes, novoCliente]);
    setNome("");
    setTelefone("");
    setQuantidadeBotijoes("");
  };

  const totalBotijoes = clientes.reduce(
    (total, cliente) => total + parseInt(cliente.quantidadeBotijoes),
    0
  );

  return (
    <View style={styles.mainContainer}>
      <Text >Cadastro de Clientes</Text>

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

      <Button title="Adicionar Cliente" onPress={adicionarCliente} />

      {/* FlatList para exibir os clientes */}
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.clienteBox}>
            <Text style={styles.clienteNome}>🧑 {item.nome}</Text>
            <Text style={styles.clienteInfo}>📞 {item.telefone}</Text>
            <Text style={styles.clienteInfo}>🛢️ {item.quantidadeBotijoes} botijões</Text>
          </View>
        )}
      />
      <View style={styles.resumo}>
        <Text style={styles.resumoTexto}>
          Total de pedidos: {clientes.length}
        </Text>
        <Text style={styles.resumoTexto}>
          Total de botijões: {totalBotijoes}
        </Text>
      </View>
    </View>
  );
};
