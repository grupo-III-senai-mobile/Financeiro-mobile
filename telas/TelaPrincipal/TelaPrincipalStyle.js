import { StyleSheet } from 'react-native';
import CORES from '../../comum/constantes/cores';

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor: '#1E1E1E',
      padding: 20,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    logo: {
      width: 400,
      height: 100,
      resizeMode: 'contain',
    },
    lancamentosContainer: {
      marginBottom: 20,
      color: "white",
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: "white",
    },
    lancamentoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      color: "white",
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    iconContainer: {
      marginRight: 10,
      color: "white",
    },
    detalhesLancamento: {
      flex: 1,
      color: "white",
    },
    descricaoLancamento: {
      fontWeight: 'bold',
      marginBottom: 3,
      color: "white",
    },
    infoLancamento: {
      marginBottom: 3,
      color: "white",
    },
    textContainer: {
      marginBottom: 20,
      color: "white",

    },
    text: {

      fontSize: 16,
      color: "white",
      padding:10,
      gap:20,
      paddingTop:200,
    },
  });
  
  export default styles;