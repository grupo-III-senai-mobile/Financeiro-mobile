import { Text, TextInput, View } from 'react-native';
import campoTextoCustomizadoStyle from './CampoTextoCustomizadoStyle';

const CampoTextoCustomizado = ({ label, style, ...props }) => {
  return (
    <View style={campoTextoCustomizadoStyle.container}>
      <Text>{label}</Text>
      <TextInput style={[campoTextoCustomizadoStyle.campoTexto, style]} {...props} />
    </View>
  );
};

export default CampoTextoCustomizado;
