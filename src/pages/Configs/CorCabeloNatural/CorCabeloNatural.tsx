import { Alert, Button, FlatList, Text, View } from 'react-native';
import { InputCelular, InputDataNascimento, InputTexto } from '../../../components/Inputs/Inputs';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number } from 'yup';
import { styles } from './styles';
import { useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';
import { getTableNames } from './useCorCabeloNatural';



export default function CorCabeloNatura(): React.JSX.Element {

  useEffect(() => {
    getTableNames().then((data) => {
      console.log(data)
    }).catch((error) => console.log(error));
  }, [])

  return (
    <View style={styles.container}>
      <Text>AQUI MEU DEUS</Text>
    </View>
  )
}