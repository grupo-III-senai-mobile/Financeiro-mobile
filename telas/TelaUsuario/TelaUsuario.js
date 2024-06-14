import React, { useEffect, useState } from 'react';
import { View, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import CampoTextoCustomizado from '../../comum/componentes/CampoTextoCustomizado/CampoTextoCustomizado';
import CORES from '../../comum/constantes/cores';
import { estilos } from './TelaFormularioStyle';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import api from '../../comum/servicos/api';

const TelaFormulario = () => {
  const [usuario, setUsuario] = useState({
    id: '',
    nome: '',
    email: '',
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: ''
  });

  const fetchUserData = async () => {
    try {
      const usuarioLogado = await AsyncStorage.getItem('USUARIO_LOGADO');
      if (usuarioLogado) {
        const userData = JSON.parse(usuarioLogado);
        const userId = userData.resultado.id;

        if (!userId) {
          throw new Error("ID do usuário não encontrado no AsyncStorage.");
        }

        const response = await api.get(`/usuario/${userId}`);
        if (response.data.resultado) {
          setUsuario(response.data.resultado);
          await AsyncStorage.setItem('USUARIO_LOGADO', JSON.stringify({ resultado: response.data.resultado }));
        } else {
          Alert.alert('Erro', 'Usuário não encontrado.');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('Erro', 'Usuário não encontrado. Por favor, verifique o ID do usuário.');
      } else {
        Alert.alert('Erro', 'Erro ao buscar os dados do usuário. Por favor, tente novamente.');
      }
      console.error('Erro ao buscar os dados do usuário:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const dadosUsuario = {
        nome: usuario.nome,
        email: usuario.email,
        estado: usuario.estado,
        cidade: usuario.cidade,
        bairro: usuario.bairro,
        rua: usuario.rua,
        numero: usuario.numero
      };

      const response = await api.put(`/usuario/${usuario.id}`, dadosUsuario);
      await AsyncStorage.setItem('USUARIO_LOGADO', JSON.stringify({ resultado: { ...response.data, id: usuario.id } }));
      
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar o perfil. Por favor, tente novamente.');
      console.error('Erro ao atualizar o perfil:', error.response || error.message || error);
    }
  };

  const handleUpdateData = async () => {
    try {
      await fetchUserData();
      Alert.alert('Sucesso', 'Dados do usuário atualizados com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar os dados do usuário. Por favor, tente novamente.');
      console.error('Erro ao atualizar os dados do usuário:', error);
    }
  };

  const handleChange = (key, value) => {
    setUsuario(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  return (
    <View style={estilos.container}>
      <View style={{ alignItems: 'center' }}>
        <MaterialIcons name='edit' size={64} color={CORES.PRIMARIA} />
        <Text style={estilos.editarperfil}>EDITAR PERFIL</Text>
      </View>

      <CampoTextoCustomizado style={estilos.input} placeholder='Nome' value={usuario.nome || ''} onChangeText={value => handleChange('nome', value)} />
      <CampoTextoCustomizado style={estilos.input} placeholder='Email' value={usuario.email || ''} onChangeText={value => handleChange('email', value)} />
      <CampoTextoCustomizado style={estilos.input} placeholder='Estado' value={usuario.estado || ''} onChangeText={value => handleChange('estado', value)} />
      <CampoTextoCustomizado style={estilos.input} placeholder='Cidade' value={usuario.cidade || ''} onChangeText={value => handleChange('cidade', value)} />
      <CampoTextoCustomizado style={estilos.input} placeholder='Bairro' value={usuario.bairro || ''} onChangeText={value => handleChange('bairro', value)} />
      <CampoTextoCustomizado style={estilos.input} placeholder='Rua' value={usuario.rua || ''} onChangeText={value => handleChange('rua', value)} />
      <CampoTextoCustomizado style={estilos.input} placeholder='Número' value={usuario.numero || ''} onChangeText={value => handleChange('numero', value)} />

      <View style={estilos.botoesContainer}>
        <BotaoCustomizado cor="primaria" estilo={estilos.button} onPress={handleSave}>
          <Text style={estilos.textoBotao}>Salvar Alterações</Text>
        </BotaoCustomizado>
        
        <BotaoCustomizado cor="padrao" estilo={estilos.button} onPress={handleUpdateData}>
          <Text style={estilos.textoBotao}>Atualizar Dados</Text>
        </BotaoCustomizado>
      </View>
    </View>
  );
};

export default TelaFormulario;
