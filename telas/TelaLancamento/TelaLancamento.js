
import React, { useState } from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import CampoTextoCustomizado from '../../comum/componentes/CampoTextoCustomizado/CampoTextoCustomizado';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import api from '../../comum/servicos/api'

import { estilos, pickerSelectStyles } from './TelaFormularioStyle';

const TelaLancamento = () => {
  const [descricao, setDescricao] = useState('');
  const [lancamentoTipo, setlancamentoTipo] = useState('');
  const [valor, setValor] = useState('');
  const [dataVencimento, setDataVencimento] = useState('');
  const [contaBancariaId, setContaBancaria] = useState('');
  const [receitaId, setReceita] = useState('');
  const [centroCustoId, setCentroCusto] = useState('');

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
  }

  const adicionarLancamento = async () => {
         const novoLancamento = {
              descricao,
              lancamentoTipo,
              valor,
              dataVencimento,
              receitaId, 
              contaBancariaId, 
              centroCustoId 
         };
          await enviarDadosParaAPI('/lancamento', novoLancamento);
       }

  return (
    <View style={estilos.container}>
      <CampoTextoCustomizado label="Descrição" value={descricao} onChangeText={setDescricao} />
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={setlancamentoTipo}
        value={lancamentoTipo}
        items={[
          { label: 'Pagamento', value: 'Pagamento' },
          { label: 'Recebimento', value: 'Recebimento' },
        ]}
        placeholder={{ label: 'Selecione o tipo de pagamento', value: "" }}
      />

      <CampoTextoCustomizado label="Valor" value={valor} onChangeText={setValor} />
      <CampoTextoCustomizado label="Data de vencimento" value={dataVencimento} onChangeText={setDataVencimento} />
      <CampoTextoCustomizado label="Receita" value={receitaId} onChangeText={setReceita} />
      <CampoTextoCustomizado label="Conta bancária" value={contaBancariaId} onChangeText={setContaBancaria} />
      <CampoTextoCustomizado label="Centro de custo" value={centroCustoId} onChangeText={setCentroCusto} />
      <BotaoCustomizado onPress={adicionarLancamento}>Adicionar</BotaoCustomizado>
    </View>
  );
};

export default TelaLancamento;
