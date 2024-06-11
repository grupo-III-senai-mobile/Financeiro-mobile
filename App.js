import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import TelaCadastros from './telas/TelaCadastros/TelaCadastros';
import TelaLancamentos from './telas/TelaLancamento/TelaLancamento';
import TelaUsuario from './telas/TelaUsuario/TelaUsuario';
import TelaPrincipal from './telas/TelaPrincipal/TelaPrincipal';
import TelaExtratos from './telas/TelaExtratos/TelaExtratos';
import TelaLogin from './telas/TelaLogin/TelaLogin';
import TelaNovoUsuario from './telas/TelaNovoUsuario/TelaNovoUsuario';
import { pegarItemStorage } from './comum/servicos/servicoStorage';
import { CHAVES_SOTORAGE } from './comum/constantes/chaves-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import CORES from './comum/constantes/cores';
import TELAS from './comum/constantes/telas';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const estilos = StyleSheet.create({
  todoApp: {
    flex: 1,
    backgroundColor: CORES.FUNDO_PADRAO,
  },
});

const Tabs = () => {
  return (
    <Tab.Navigator
      activeColor="#B4E0D9"
      inactiveColor="#fff"
      shifting={false}
      barStyle={{ backgroundColor: CORES.PRIMARIA }}
    >
      <Tab.Screen
        name={TELAS.TELA_PRINCIPAL}
        component={TelaPrincipal}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TELAS.TELA_CADASTROS}
        component={TelaCadastros}
        options={{
          title: 'Cadastros',
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TELAS.TELA_LANCAMENTO}
        component={TelaLancamentos}
        options={{
          title: 'Laçamentos',
          tabBarIcon: ({ color }) => (
            <Icon name="create-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TELAS.TELA_EXTRATOS}
        component={TelaExtratos}
        options={{
          title: 'Extratos',
          tabBarIcon: ({ color }) => (
            <Icon name="list-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={TELAS.TELA_USUARIO}
        component={TelaUsuario}
        options={{
          title: 'Usuarios',
          tabBarIcon: ({ color }) => (
            <Icon name="person-circle-sharp" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(undefined);

  useEffect(() => {
    const verificarSeUsuarioEstaLogado = async () => {
      const usuarioQueEstaNoStorage = await pegarItemStorage(CHAVES_SOTORAGE.USUARIO_LOGADO);
      setUsuarioLogado(usuarioQueEstaNoStorage);
    };

    verificarSeUsuarioEstaLogado();
  }, []);

  const handleCadastroUsuario = () => {
    // Navegue para a tela de cadastro de usuário
  };

  if (usuarioLogado === undefined) {
    return <></>;
  }

  return (
    <View style={estilos.todoApp}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={usuarioLogado ? 'Tabs' : TELAS.TELA_LOGIN} screenOptions={{ headerShown: false }}>
          {usuarioLogado ? (
            <Stack.Screen name="Tabs" component={Tabs} />
          ) : (
            <>
              <Stack.Screen name={TELAS.TELA_LOGIN}>
                {props => <TelaLogin {...props} onCadastroUsuario={handleCadastroUsuario} setUsuarioLogado={setUsuarioLogado} />}
              </Stack.Screen>
              <Stack.Screen name={TELAS.TELA_NOVO_USUARIO} component={TelaNovoUsuario} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}
