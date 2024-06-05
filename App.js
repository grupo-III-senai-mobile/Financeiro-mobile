import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';
import CORES from './comum/constantes/cores';
import TELAS from './comum/constantes/telas';
import TelaContador from './telas/TelaContador/TelaContador';
import TelaFormulario from './telas/TelaFormulario/TelaFormulario';
import TelaPrincipal from './telas/TelaPrincipal/TelaPrincipal';
import TelaListaTarefas from './telas/TelaListaTarefas/TelaListaTarefas';
import TelaLogin from './telas/TelaLogin/TelaLogin';
import TelaNovoUsuario from './telas/TelaNovoUsuario/TelaNovoUsuario';
import { useEffect, useState } from 'react';
import { pegarItemStorage } from './comum/servicos/servicoStorage';
import { CHAVES_SOTORAGE } from './comum/constantes/chaves-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const estilos = StyleSheet.create({
  todoApp: {
    flex: 1,
    backgroundColor: CORES.FUNDO_PADRAO,
  },
});

export default function App() {
  const [usuarioLogado, setUsuarioLogado] = useState();

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
        {usuarioLogado ? (
          <Tab.Navigator>
            <Tab.Screen name={TELAS.TELA_PRINCIPAL} component={TelaPrincipal} options={{ title: 'Principal' }} />
            <Tab.Screen name={TELAS.TELA_CONTADOR} component={TelaContador} options={{ title: 'Contador' }} />
            <Tab.Screen name={TELAS.TELA_FORMULARIO} component={TelaFormulario} options={{ title: 'Formulário' }} />
            <Tab.Screen name={TELAS.TELA_LISTA_TAREFAS} component={TelaListaTarefas} options={{ title: 'Lista Tarefas' }} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator initialRouteName={TELAS.TELA_LOGIN} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={TELAS.TELA_LOGIN}>
              {props => <TelaLogin {...props} onCadastroUsuario={handleCadastroUsuario} />}
            </Stack.Screen>
            <Stack.Screen name={TELAS.TELA_NOVO_USUARIO} component={TelaNovoUsuario} />
          </Stack.Navigator>
        )}
      </NavigationContainer>

      <StatusBar style='auto' />
    </View>
  );
}
