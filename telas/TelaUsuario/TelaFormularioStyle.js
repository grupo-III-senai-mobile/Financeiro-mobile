import { StyleSheet } from 'react-native';

const estilos = StyleSheet.create({
  editarperfil : {
    color: 'white',
    fontSize:  20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
   
  },
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Fundo dark
    padding: 20,
  },
  input: {
    backgroundColor: '#2C2C2C', // Fundo escuro para os inputs
    color: '#FFFFFF', // Texto claro
    padding: 15,
    marginBottom: 15,
    borderRadius: 10, // Bordas arredondadas
    borderWidth: 1,
    borderColor: '#27A791', // Borda com a cor do tema
  },
  button: {
    backgroundColor: '#27A791', // Fundo com a cor do tema
    color: '#FFFFFF', // Texto claro no botão
    padding: 15,
    borderRadius: 10, // Bordas arredondadas
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  icon: {
    fontSize: 64,
    color: '#27A791', // Ícone com a cor do tema
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export { estilos };
