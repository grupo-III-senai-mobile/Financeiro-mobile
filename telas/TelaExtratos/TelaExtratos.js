import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../../comum/servicos/api';
import { MaterialIcons } from '@expo/vector-icons'; // Importando ícones do Material Icons
import estilos from './TelaListaTarefasStyle';

const TelaListaLancamentos = () => {
  const [listaLancamentos, setListaLancamentos] = useState([]);

  const fetchLancamentos = async () => {
    try {
      const response = await api.get('/lancamento');
      console.log("Resposta /lancamento:", response.data);

      if (response.data && Array.isArray(response.data)) {
        const lancamentosFiltrados = response.data.filter(lancamento => {
          const dataVencimento = new Date(lancamento.dataVencimento);
          const hoje = new Date();
          return dataVencimento >= hoje; // Filtra apenas lançamentos cuja data de vencimento não passou
        });
        setListaLancamentos(lancamentosFiltrados);
      } else {
        console.error("Dados de /lancamento não são um array:", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar dados de /lancamento:", error);
      // Trate o erro conforme necessário, exibindo uma mensagem ao usuário, por exemplo
    }
  };

  useEffect(() => {
    fetchLancamentos();
  }, []);

  const handleExcluirLancamento = async (id) => {
    try {
      await api.delete(`/lancamento/${id}`);
      const novaLista = listaLancamentos.filter(lancamento => lancamento.id !== id);
      setListaLancamentos(novaLista);
      console.log(`Lançamento com ID ${id} excluído com sucesso.`);
    } catch (error) {
      console.error(`Erro ao excluir lançamento com ID ${id}:`, error);
      // Trate o erro conforme necessário, exibindo uma mensagem ao usuário, por exemplo
    }
  };

  const renderItemLancamento = ({ item }) => (
    
    <View style={styles.lancamentoItem}>
      
      <View style={styles.iconContainer}>
        {item.lancamentoTipo === 'Recebimento' && (
          <MaterialIcons name="arrow-downward" size={20} color="green" />
        )}
        {item.lancamentoTipo === 'Pagamento' && (
          <MaterialIcons name="arrow-upward" size={20} color="red" />
        )}
      </View>
      <View style={styles.detalhesLancamento}>
        <Text style={styles.descricaoLancamento}>Descrição: {item.descricao}</Text>
        <Text style={styles.infoLancamento}>Tipo: {item.lancamentoTipo}</Text>
        <Text style={styles.infoLancamento}>Valor: {item.valor}</Text>
        <Text style={styles.infoLancamento}>Data de Vencimento: {new Date(item.dataVencimento).toLocaleDateString()}</Text>
      </View>
      <TouchableOpacity onPress={() => handleExcluirLancamento(item.id)} style={styles.botaoExcluir}>
        <Text style={styles.textoBotaoExcluir}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={estilos.container}>
      <View style={{ alignSelf: 'center' }}>
        < MaterialIcons style={estilos.icons} name='leaderboard' size={64}  />
      </View>

      <View style={{ flexDirection: 'center', alignItems: 'center'}}>
        <Text style={estilos.text} >Extrato</Text>
      </View>

      <TouchableOpacity onPress={fetchLancamentos} style={styles.botaoAtualizar}>
        <Text style={styles.textoBotaoAtualizar}>Atualizar Lista</Text>
      </TouchableOpacity>

      <FlatList
        data={listaLancamentos}
        renderItem={renderItemLancamento}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lancamentoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#FFFFFF',
  },
  iconContainer: {
    marginRight: 10,
    color: '#FFFFFF',
  },
  detalhesLancamento: {
    flex: 1,
    color: '#FFFFFF',
  },
  descricaoLancamento: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFFFFF',
  },
  infoLancamento: {
    marginBottom: 3,
    color: '#FFFFFF',
  },
  botaoExcluir: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBotaoExcluir: {
    color: 'white',
    fontWeight: 'bold',
  },
  botaoAtualizar: {
    backgroundColor: '#27A791',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBotaoAtualizar: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TelaListaLancamentos;
