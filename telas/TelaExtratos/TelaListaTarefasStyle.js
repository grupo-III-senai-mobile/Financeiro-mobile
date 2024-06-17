import { StyleSheet } from 'react-native';

import CORES from '../../comum/constantes/cores';

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Fundo dark
    padding: 20,
    color: '#FFFFFF',
  },
  textoBranco: {
    color: '#FFFFFF',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  icons : {
    color : '#27A791'
  }
});

export default estilos;
