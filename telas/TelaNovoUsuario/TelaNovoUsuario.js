import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import CampoTextoCustomizado from '../../comum/componentes/CampoTextoCustomizado/CampoTextoCustomizado';
import TELAS from '../../comum/constantes/telas';
import api from '../../comum/servicos/api';
import estilos from './TelaNovoUsuarioStyle';

const TelaNovoUsuario = (props) => {
  const [campoNome, setCampoNome] = React.useState('');
  const [campoEmail, setCampoEmail] = React.useState('');
  const [campoSenha, setCampoSenha] = React.useState('');
  const [campoCPF, setCampoCPF] = React.useState('');
  const [campoDtNascimento, setCampoDtNascimento] = React.useState('');
  const [campoEstado, setCampoEstado] = React.useState('');
  const [campoCidade, setCampoCidade] = React.useState('');
  const [campoBairro, setCampoBairro] = React.useState('');
  const [campoRua, setCampoRua] = React.useState('');
  const [campoNumero, setCampoNumero] = React.useState('');

  const salvar = async () => {
    try {
      const novoUsuario = {
        nome: campoNome,
        email: campoEmail,
        senha: campoSenha,
        cpf: campoCPF,
        dtNascimento: campoDtNascimento,
        estado: campoEstado,
        cidade: campoCidade,
        bairro: campoBairro,
        rua: campoRua,
        numero: campoNumero,
      };

      await api.post('/usuario', novoUsuario);
      alert('Dados salvos com sucesso!');
      props.navigation.navigate(TELAS.TELA_LOGIN);
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <ScrollView style={estilos.scrollView}>
      <View style={estilos.container}>
        <View style={estilos.containerTituloNovoUsuario}>
          <Text style={estilos.tituloNovoUsuario}>Novo Usuário</Text>
        </View>

        <CampoTextoCustomizado label='Nome' value={campoNome} onChangeText={setCampoNome} />
        <CampoTextoCustomizado label='Email' value={campoEmail} onChangeText={setCampoEmail} />
        <CampoTextoCustomizado label='Senha' value={campoSenha} onChangeText={setCampoSenha} />
        <CampoTextoCustomizado label='CPF' value={campoCPF} onChangeText={setCampoCPF} />
        <CampoTextoCustomizado label='Data de Nascimento' value={campoDtNascimento} onChangeText={setCampoDtNascimento} />
        <CampoTextoCustomizado label='Estado' value={campoEstado} onChangeText={setCampoEstado} />
        <CampoTextoCustomizado label='Cidade' value={campoCidade} onChangeText={setCampoCidade} />
        <CampoTextoCustomizado label='Bairro' value={campoBairro} onChangeText={setCampoBairro} />
        <CampoTextoCustomizado label='Rua' value={campoRua} onChangeText={setCampoRua} />
        <CampoTextoCustomizado label='Número' value={campoNumero} onChangeText={setCampoNumero} />

        <BotaoCustomizado cor='secundaria' onPress={salvar}>
          Salvar
        </BotaoCustomizado>
        <BotaoCustomizado onPress={() => props.navigation.navigate(TELAS.TELA_LOGIN)}>Já tenho uma conta</BotaoCustomizado>
      </View>
    </ScrollView>
  );
};

export default TelaNovoUsuario;
