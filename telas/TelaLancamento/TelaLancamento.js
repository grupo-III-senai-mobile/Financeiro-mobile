import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CampoTextoCustomizado from '../../comum/componentes/CampoTextoCustomizado/CampoTextoCustomizado';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import api from '../../comum/servicos/api';
import { estilos, pickerSelectStyles } from './TelaFormularioStyle';

const TelaLancamento = () => {
  const [descricao, setDescricao] = useState('');
  const [lancamentoTipo, setlancamentoTipo] = useState('');
  const [valor, setValor] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [contaBancariaId, setContaBancaria] = useState('');
  const [receitaId, setReceita] = useState('');
  const [centroCustoId, setCentroCusto] = useState('');
  const [contasBancarias, setContasBancarias] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [centrosCusto, setCentrosCusto] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contasBancariasResponse, receitasResponse, centrosCustoResponse] = await Promise.all([
          api.get('/contaBancaria'),
          api.get('/receita'),
          api.get('/centroCusto')
        ]);

        console.log("Resposta /contaBancaria:", contasBancariasResponse);
        console.log("Resposta /receita:", receitasResponse);
        console.log("Resposta /centroCusto:", centrosCustoResponse);

        if (Array.isArray(contasBancariasResponse.data.resultado)) {
          setContasBancarias(contasBancariasResponse.data.resultado.map(item => ({ label: item.nome, value: item.id })));
        } else {
          console.error("Dados de /contaBancaria não são um array:", contasBancariasResponse.data);
        }

        if (Array.isArray(receitasResponse.data.resultado)) {
          setReceitas(receitasResponse.data.resultado.map(item => ({ label: item.nome, value: item.id })));
        } else {
          console.error("Dados de /receitas não são um array:", receitasResponse.data);
        }

        if (Array.isArray(centrosCustoResponse.data.resultado)) {
          setCentrosCusto(centrosCustoResponse.data.resultado.map(item => ({ label: item.nome, value: item.id })));
        } else {
          console.error("Dados de /centrosCusto não são um array:", centrosCustoResponse.data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        Alert.alert('Erro', 'Não foi possível carregar os dados. Tente novamente mais tarde.');
      }
    };

    fetchData();
  }, []);

  const enviarDadosParaAPI = async (endpoint, dados) => {
    try {
      console.log("Enviando dados para a API:", endpoint, dados);
      await api.post(endpoint, dados);
      alert('Dados salvos com sucesso!');
    } catch (error) {
      console.error("Erro na solicitação:", error);
      const mensagemErro = error.response?.data || 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
      alert(mensagemErro);
    }
  };

  const adicionarLancamento = async () => {
    const novoLancamento = {
      descricao,
      lancamentoTipo,
      valor,
      dataVencimento,
      receitaId,
      contaBancariaId,
      centroCustoId,
    };
    console.log(novoLancamento);
    await enviarDadosParaAPI('/lancamento', novoLancamento);
  };

  return (
    <View style={estilos.container}>
      <CampoTextoCustomizado style={estilos.textocampo} placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={(value) => {
          setlancamentoTipo(value);
          setReceita(''); // Limpar receita ao mudar tipo para 'Pagamento'
          setCentroCusto(''); // Limpar centro de custo ao mudar tipo para 'Recebimento'
        }}
        value={lancamentoTipo}
        items={[
          { label: 'Pagamento', value: 'Pagamento' },
          { label: 'Recebimento', value: 'Recebimento' },
        ]}
        placeholder={{ label: 'Selecione o tipo de pagamento', value: "" }}
      />
      <CampoTextoCustomizado style={estilos.textocampo} placeholder="Valor" value={valor} onChangeText={setValor} />
      <CampoTextoCustomizado style={estilos.textocampo} placeholder="Data de vencimento" value={dataVencimento} onChangeText={setDataVencimento} />
      {lancamentoTipo === 'Recebimento' ? (
        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={setReceita}
          value={receitaId}
          items={receitas}
          placeholder={{ label: 'Selecione a receita', value: "" }}
        />
      ) : (
        <View />
      )}
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={setContaBancaria}
        value={contaBancariaId}
        items={contasBancarias}
        placeholder={{ label: 'Selecione a conta bancária', value: "" }}
      />
      {lancamentoTipo === 'Pagamento' ? (
        <RNPickerSelect
          style={pickerSelectStyles}
          onValueChange={setCentroCusto}
          value={centroCustoId}
          items={centrosCusto}
          placeholder={{ label: 'Selecione o centro de custo', value: "" }}
        />
      ) : (
        <View />
      )}
      <BotaoCustomizado cor='primaria' onPress={adicionarLancamento}>Adicionar</BotaoCustomizado>
    </View>
  );
};

export default TelaLancamento;
