import React from 'react';
import {View, ScrollView, Text } from 'react-native';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import CampoTextoCustomizado from '../../comum/componentes/CampoTextoCustomizado/CampoTextoCustomizado';
import CORES from '../../comum/constantes/cores';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import api from '../../comum/servicos/api';
import { useNavigation } from '@react-navigation/native';

import { estilos} from './TelaCadastrosStyle';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TelaCadastros = (props) => {
  const [campoNome, setCampoNome] = React.useState('');
  const [campoEmail, setCampoEmail] = React.useState('');
  const [campoCPF, setcampoCPF] = React.useState('');
  const [campoTelefone, setCampoTelefone] = React.useState('');

  const [campoNomeCentroDeCusto, setCampoNomeCentroDeCusto] = React.useState('');
  const [campoEmailCentroDeCusto, setCampoEmailCentroDeCusto] = React.useState('');
  const [campoCPFCentroDeCusto, setcampoCPFCentroDeCusto] = React.useState('');
  const [campoTelefoneCentroDeCusto, setCampoTelefoneCentroDeCusto] = React.useState('');

  const [campoNomeContaBancaria, setCampoNomeContaBancaria] = React.useState('');
  const [campoAgenciaContaBancaria, setCampoAgenciaContaBancaria] = React.useState('');
  const [campoContaContaBancaria, setCampoContaContaBancaria] = React.useState('');
 

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
  
  const AdicionarReceita = async () => {
    const cadastroReceita = {
      nome: campoNome,
      email: campoEmail,
      cpf: campoCPF,
      telefone: campoTelefone,
    };
  
    await enviarDadosParaAPI('/Receita', cadastroReceita);
  }
  
  const AdicionarCentroDeCusto = async () => {
    const cadastroCentroDeCusto = {
      nome: campoNomeCentroDeCusto,
      email: campoEmailCentroDeCusto,
      cpf: campoCPFCentroDeCusto,
      telefone: campoTelefoneCentroDeCusto,
    };
  
    await enviarDadosParaAPI('/centroCusto', cadastroCentroDeCusto);
  };

  const AdicionarContaBancaria = async () => {
    const cadastroContaBancaria = {
      nome: campoNomeContaBancaria,
      agencia: campoAgenciaContaBancaria,
      conta: campoContaContaBancaria,
    };
  
    await enviarDadosParaAPI('/contaBancaria', cadastroContaBancaria);
  };
  
  

  return (
    <ScrollView style={estilos.scrollView}>
    <View style={estilos.container}>

      <View style={{ alignSelf: 'center' }}>
        < MaterialIcons style={estilos.icons} name='attach-money' size={64}  />
      </View>

     {/* Receita */}

      <View style={{ flexDirection: 'center', alignItems: 'center'}}>
        <Text style={estilos.text} >Receita</Text>
      </View>
      
      <CampoTextoCustomizado style={estilos.input} placeholder="Nome" value={campoNome} onChangeText={setCampoNome} />
      <CampoTextoCustomizado style={estilos.input} placeholder='Email' value={campoEmail} onChangeText={setCampoEmail} />
      <CampoTextoCustomizado style={estilos.input} placeholder='CPF' inputMode='numeric' value={campoCPF} onChangeText={setcampoCPF} />
      <CampoTextoCustomizado style={estilos.input} placeholder='Telefone' inputMode='numeric' value={campoTelefone} onChangeText={setCampoTelefone} />
      <BotaoCustomizado cor="primaria" onPress={AdicionarReceita}>Adicionar</BotaoCustomizado>
      <br/>

     {/* Centro de custo */}

     <View style={{ alignSelf:'center'}}>
         <FontAwesome5 style={estilos.icons} name='calculator' size={45} color={'purple'}></FontAwesome5>
      </View>


      <View style={{ flexDirection: 'center', alignItems: 'center'}}>
      <Text style={estilos.text}>Centro de custo</Text>
      </View>

      <CampoTextoCustomizado style={estilos.input} placeholder="Nome" value={campoNomeCentroDeCusto} onChangeText={setCampoNomeCentroDeCusto} />
      <CampoTextoCustomizado style={estilos.input} placeholder='Email' value={campoEmailCentroDeCusto} onChangeText={setCampoEmailCentroDeCusto} />
      <CampoTextoCustomizado style={estilos.input} placeholder='CPF' inputMode='numeric' value={campoCPFCentroDeCusto} onChangeText={setcampoCPFCentroDeCusto} />
      <CampoTextoCustomizado style={estilos.input} placeholder='Telefone' inputMode='numeric' value={campoTelefoneCentroDeCusto} onChangeText={setCampoTelefoneCentroDeCusto} />
      <BotaoCustomizado  cor="primaria" onPress={AdicionarCentroDeCusto}>Adicionar</BotaoCustomizado>
      <br/>

       {/* Conta Bancaria */}

      

      <View style={{ flexDirection: 'center', alignItems: 'center'}}>
         <FontAwesome style={estilos.icons} name='bank' size={45} color={'purple'}></FontAwesome>
        
      <Text style={estilos.text}>Conta Bancaria</Text>
      </View>
      

      <CampoTextoCustomizado style={estilos.input} placeholder="Nome" value={campoNomeContaBancaria} onChangeText={setCampoNomeContaBancaria} />
      <CampoTextoCustomizado style={estilos.input} placeholder='Agencia' inputMode='numeric' value={campoAgenciaContaBancaria} onChangeText={setCampoAgenciaContaBancaria} />
      <CampoTextoCustomizado style={estilos.input} placeholder='Conta' inputMode='numeric' value={campoContaContaBancaria} onChangeText={setCampoContaContaBancaria} />
      <BotaoCustomizado  cor="primaria" onPress={AdicionarContaBancaria}>Adicionar</BotaoCustomizado>


    </View>
    </ScrollView>
  );
};

export default TelaCadastros;
