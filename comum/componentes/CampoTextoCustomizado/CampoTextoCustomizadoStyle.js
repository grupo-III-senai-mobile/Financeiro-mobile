import { StyleSheet } from 'react-native';
import CORES from '../../constantes/cores';

const campoTextoCustomizadoStyle = StyleSheet.create({
  container: {
    width: '100%',
    gap: 4,
  },
  campoTexto: {
    borderWidth: 1,
    borderColor: 'black',
    height: 40,
    padding: 8,
    backgroundColor: CORES.BRANCA,
    borderRadius: 8,
  },
});

export default campoTextoCustomizadoStyle;
