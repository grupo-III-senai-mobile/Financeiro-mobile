import { StyleSheet } from 'react-native';

export const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
    backgroundColor : '#1E1E1E'
  },
  textocampo: {
    backgroundColor: '#2C2C2C', // Fundo escuro para os inputs
    color: '#FFFFFF', // Texto claro
    padding: 15,
    marginBottom: 15,
    borderRadius: 10, // Bordas arredondadas
    borderWidth: 1,
    borderColor: '#27A791', // Borda com a cor do tema
  }
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#2C2C2C', // Fundo escuro para os inputs
    color: 'red', // Texto claro
    padding: 15,
    marginBottom: 15,
    borderRadius: 10, // Bordas arredondadas
    borderWidth: 1,
    borderColor: '#27A791', // Borda com a cor do tema
  },
  inputAndroid: {
    backgroundColor: '#2C2C2C', // Fundo escuro para os inputs
    color: 'red', // Texto claro
    padding: 15,
    marginBottom: 15,
    borderRadius: 10, // Bordas arredondadas
    borderWidth: 1,
    borderColor: '#27A791', // Borda com a cor do tema
  },
  placeholder: {
    color: 'red', // Cor do placeholder
  },

  inputWeb: {
    backgroundColor: '#2C2C2C', // Fundo escuro para os inputs
    color: 'white', // Texto claro
    padding: 15,
    marginBottom: 15,
    borderRadius: 10, // Bordas arredondadas
    borderWidth: 1,
    borderColor: '#27A791', // Borda com a cor do tema
  },
});