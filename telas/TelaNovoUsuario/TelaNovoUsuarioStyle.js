import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    gap: 9,
  },

  scrollView: {
    backgroundColor: '#1E1E1E',
    flex: 1,
  },

  containerTituloNovoUsuario: {
    alignItems: 'center',
    marginBottom: 10,
  },
  tituloNovoUsuario: {
    fontSize: 26,
    color: '#ffffff',
  },
  input: {
    backgroundColor: '#2C2C2C', // Fundo escuro para os inputs
    color: '#ffffff', // Texto claro dentro dos inputs
    padding: 15,
    borderRadius: 10, // Bordas arredondadas
    borderColor: '#27A791', // Borda com a cor do tema
    borderWidth: 1,
    shadowColor: '#000', // Sombra para dar profundidade
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  label:{
    color: 'white'
  }

});

export default estilos;
