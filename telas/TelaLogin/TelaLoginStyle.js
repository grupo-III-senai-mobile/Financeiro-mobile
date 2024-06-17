import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    gap: 16,
  },

  input: {
    backgroundColor: '#2C2C2C', // Fundo escuro para os inputs
    color: '#ffffff', // Texto claro dentro dos inputs
    padding: 15,
    borderRadius: 10, // Bordas arredondadas
    marginBottom: 15,
    borderColor: '#27A791', // Borda com a cor do tema
    borderWidth: 1,
    shadowColor: '#000', // Sombra para dar profundidade
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  containerTituloEntrar: {
    alignItems: 'center',
  },
  tituloEntrar: {
    fontSize: 36,
  },
  logo: {
    justifyContent: 'center',
    width:380, // Defina o tamanho adequado para a imagem
    height: 100,
    resizeMode: 'contain', // Ajuste o modo de redimensionamento conforme necessário
  }
  
});

export default estilos;
