import { StyleSheet } from 'react-native';
import CORES from '../../comum/constantes/cores';

export const estilos = StyleSheet.create({
  scrollView: {
    backgroundColor: '#1E1E1E', // Fundo dark
  },
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
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
  button: {
    backgroundColor: '#27A791', // Fundo com a cor do tema
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000', // Sombra para o botão
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    gap: 16
  },
  buttonText: {
    color: '#ffffff', // Texto branco no botão
    fontSize: 18,
    fontWeight: 'bold',
  },
  icons : {
    color : '#27A791'
  }
});
