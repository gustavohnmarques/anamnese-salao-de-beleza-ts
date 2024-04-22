import { Alert, Button, FlatList, Text, View } from 'react-native';
import { InputCelular, InputDataNascimento, InputTexto } from '../../../components/Inputs/Inputs';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number } from 'yup';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import SQLite from 'react-native-sqlite-storage';
import { deleteCorCabeloNatural, getCoresCabeloNatural, novaCorCabeloNatural } from './useCorCabeloNatural';
import { ListaCorCabeloNatural } from './types';
import { CorCabeloNaturalItem } from '../../../components/Configs/CorCabeloNatural/CorCabeloNaturalItem';
import NovoItem, {Cadastro} from '../../../components/Configs/CorCabeloNatural/NovoItem';



export default function CorCabeloNatura(): React.JSX.Element {

  const [listaCorCabelo, setListaCorCabelo] = useState<ListaCorCabeloNatural[]>();

  useEffect(() => {
    getCoresCabeloNatural(setListaCorCabelo);
  }, [])

  const handleDelete = async (id: Number) => {
    deleteCorCabeloNatural(id);
    setListaCorCabelo(listaCorCabelo?.filter(item => item.id != id));
  }

  const handleEdit = () => {

  }

  const handleNovoItem = async (props: Cadastro) => {
    novaCorCabeloNatural(props);
    getCoresCabeloNatural(setListaCorCabelo);
  }


  function renderItem(item: any): React.JSX.Element {
    console.log(item)
    return <CorCabeloNaturalItem {...item.item} handleDelete={handleDelete} handleEdit={handleEdit} key={String(item.id)} />
  }

  return (
    <View style={styles.container}>
      <NovoItem funcaoRetorno={handleNovoItem} />
      <FlatList
        data={listaCorCabelo}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 15 }}
      />
    </View>
  )
}