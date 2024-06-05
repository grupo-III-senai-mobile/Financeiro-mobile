import React from 'react';
import { Text, View } from 'react-native';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import CampoTextoCustomizado from '../../comum/componentes/CampoTextoCustomizado/CampoTextoCustomizado';
import TELAS from '../../comum/constantes/telas';
import api from '../../comum/servicos/api';
import estilos from './TelaNovoUsuarioStyle';

const TelaNovoUsuario = (props) => {
  const [campoNome, setCampoNome] = React.useState('');
  const [campoEmail, setCampoEmail] = React.useState('');
  const [campoSenha, setCampoSenha] = React.useState('');

  const salvar = async () => {
    try {
      const usuario = {
        nome: campoNome,
        email: campoEmail,
        senha: campoSenha,
      };

      await api.post('/usuarios', usuario);
      alert('Dados salvos com sucesso!');
      props.navigation.navigate(TELAS.TELA_LOGIN);
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.containerTituloNovoUsuario}>
        <Text style={estilos.tituloNovoUsuario}>Novo Usuário</Text>
      </View>

      <CampoTextoCustomizado label='Nome' value={campoNome} onChangeText={setCampoNome} />
      <CampoTextoCustomizado label='Email' value={campoEmail} onChangeText={setCampoEmail} />
      <CampoTextoCustomizado label='Senha' value={campoSenha} onChangeText={setCampoSenha} />

      <BotaoCustomizado cor='secundaria' onPress={salvar}>
        Salvar
      </BotaoCustomizado>
      <BotaoCustomizado onPress={() => props.navigation.navigate(TELAS.TELA_LOGIN)}>Já tenho uma conta</BotaoCustomizado>
    </View>
  );
};

export default TelaNovoUsuario;
