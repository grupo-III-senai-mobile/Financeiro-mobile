import { Text, View } from 'react-native';
import BotaoCustomizado from '../../comum/componentes/BotaoCustomizado/BotaoCustomizado';
import { CHAVES_SOTORAGE } from '../../comum/constantes/chaves-storage';
import { atualizarItemStorage, pegarItemStorage } from '../../comum/servicos/servicoStorage';
import estilos from './TelaListaTarefasStyle';

const ItemTarefa = (props) => {
  // console.log(props);

  const removerItem = async () => {
    const itensDoStorage = await pegarItemStorage(CHAVES_SOTORAGE.LISTA_TAREFAS);
    itensDoStorage.splice(props.index, 1);
    await atualizarItemStorage(CHAVES_SOTORAGE.LISTA_TAREFAS, [...itensDoStorage]);
    props.setListaTarefas([...itensDoStorage]);
  };

  return (
    <View style={estilos.itemTarefa}>
      <Text style={estilos.descricaoTarefa}>{props.item.descricao}</Text>
      <BotaoCustomizado cor='secundaria' onPress={removerItem}>
        -
      </BotaoCustomizado>
    </View>
  );
};

export default ItemTarefa;
