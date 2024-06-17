import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../comum/servicos/api';
import styles from './TelaPrincipalStyle.js';

const TelaPrincipal = () => {
  const [lancamentos, setLancamentos] = useState([]);

  useEffect(() => {
    const carregarLancamentos = async () => {
      await fetchLancamentos();
    };

    carregarLancamentos();
  }, []);

  const fetchLancamentos = async () => {
    try {
      const response = await api.get('/lancamento');
      console.log('Lançamentos recebidos:', response.data);

      if (response.data && Array.isArray(response.data)) {
        const lancamentosOrdenados = response.data
          .filter(lancamento => {
            const dataVencimento = new Date(lancamento.dataVencimento);
            const hoje = new Date();
            return dataVencimento >= hoje;
          })
          .sort((a, b) => new Date(a.dataVencimento) - new Date(b.dataVencimento)).reverse();
        
        setLancamentos(lancamentosOrdenados);
      } else {
        console.error('Dados de /lancamento não são um array:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar dados de /lancamento:', error);
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
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.lancamentosContainer}>
        <Text style={styles.title}>Próximos Lançamentos</Text>
        <FlatList
          data={lancamentos}
          renderItem={renderItemLancamento}
          keyExtractor={(item) => item.id.toString()}
        />
        <View style={styles.textContainer}></View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Gerencie suas finanças pessoais com facilidade usando um aplicativo de controle financeiro intuitivo. Acompanhe suas receitas e despesas de maneira organizada, categorizando todos os seus gastos para uma visão clara de onde seu dinheiro está sendo direcionado.</Text>
      </View>
    </ScrollView>
  );
};

export default TelaPrincipal;
