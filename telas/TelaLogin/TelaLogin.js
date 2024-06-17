import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import CampoTextoCustomizado from '../../comum/componentes/CampoTextoCustomizado/CampoTextoCustomizado';
import TELAS from '../../comum/constantes/telas';
import api from '../../comum/servicos/api';
import estilos from './TelaLoginStyle';
import { atualizarItemStorage } from '../../comum/servicos/servicoStorage';
import { CHAVES_SOTORAGE } from '../../comum/constantes/chaves-storage';

const TelaLogin = (props) => {
  const [campoUsuario, setCampoUsuario] = useState('');
  const [campoSenha, setCampoSenha] = useState('');

  const handleEntrar = async () => {
    try {
      if (!campoUsuario.trim() || !campoSenha.trim()) {
        alert('Preencha os campos!');
        return;
      }

      const response = await api.post('/logar', { email: campoUsuario, senha: campoSenha });

      await atualizarItemStorage(CHAVES_SOTORAGE.USUARIO_LOGADO, response.data);
      props.setUsuarioLogado(response.data); // Atualiza o estado do usuário logado
    } catch (error) {
      alert(error.response.data);
    }
  };

  const handleCadastroUsuario = () => {
    props.navigation.navigate(TELAS.TELA_NOVO_USUARIO); // Navegue para a tela de cadastro de usuário
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.logoContainer}>
   <Image source={require('../../assets/logo.png')} style={estilos.logo} />
      </View>

      <CampoTextoCustomizado  style={estilos.input} placeholder='E-mail'  value={campoUsuario} onChangeText={setCampoUsuario} />
      <CampoTextoCustomizado icon='lock' style={estilos.input} placeholder='Senha' value={campoSenha} onChangeText={setCampoSenha} />
      <BotaoCustomizado cor='primaria' onPress={handleEntrar}>
        Entrar
      </BotaoCustomizado>
      <BotaoCustomizado cor='secundaria' onPress={handleCadastroUsuario}>
        Novo Cadastro
      </BotaoCustomizado>
    </View>
  );
};

export default TelaLogin;
