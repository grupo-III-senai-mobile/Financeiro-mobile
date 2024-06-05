import { Text, View } from 'react-native';

import estilos from './ListagemVaziaStyle';

const ListagemVazia = () => {
  return (
    <View style={estilos.container}>
      <Text style={estilos.textoVazio}>Nenhum item para listar.</Text>
    </View>
  );
};

export default ListagemVazia;
