import { useState } from 'react';
import { Text, View } from 'react-native';
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

  const entrar = async () => {
    try {
      if (!campoUsuario.trim() || !campoSenha.trim()) {
        alert('Preencha os campos!');
        return;
      }

      const response = await api.post('/logar', { email: campoUsuario, senha: campoSenha });

      await atualizarItemStorage(CHAVES_SOTORAGE.USUARIO_LOGADO, response.data);
      props.navigation.navigate(TELAS.TELA_PRINCIPAL);
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.containerTituloEntrar}>
        <Text style={estilos.tituloEntrar}>Entrar</Text>
      </View>
      <CampoTextoCustomizado label='E-mail' value={campoUsuario} onChangeText={setCampoUsuario} />
      <CampoTextoCustomizado label='Senha' value={campoSenha} onChangeText={setCampoSenha} />
      <BotaoCustomizado cor='primaria' onPress={entrar}>
        Entrar
      </BotaoCustomizado>
      <BotaoCustomizado
        onPress={() => {
          props.navigation.navigate(TELAS.TELA_NOVO_USUARIO);
        }}
      >
        Novo Cadastro
      </BotaoCustomizado>
    </View>
  );
};

export default TelaLogin;
