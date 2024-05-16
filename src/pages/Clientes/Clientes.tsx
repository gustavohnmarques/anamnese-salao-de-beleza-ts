import { Alert, Button, FlatList, Text, View } from 'react-native';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateUser, Input, PropsTipoInput } from './Types';
import { object, string, number } from 'yup';
import * as S from './styles';
import { useTheme } from '../../contexts/theme';
import Header from '../../components/Header/Header';
import React, { useCallback } from 'react';
import { isTablet } from 'react-native-device-info';
const InputCelular = React.lazy(() => import('../../components/Inputs/InputCelular'));
const InputDataNascimento = React.lazy(() => import('../../components/Inputs/InputDataNascimento'));
const InputTexto = React.lazy(() => import('../../components/Inputs/InputTexto'));


export default function Clientes(): React.JSX.Element {

  const { handleChangeTheme } = useTheme();


  const formType = object({
    nome: string().min(5, 'Informe corretamente o nome.').required('Informe corretamente o nome.'),
    dataNascimento: string().min(10, 'Informe corretamente a data de nascimento.').required('Informe corretamente a data de nascimento.'),
    email: string().email('Informe corretamente o e-mail.').required('Informe corretamente o e-mail.'),
    celular: string().min(17, 'Informe corretamente o celular.').required('Informe corretamente o celular.'),
    cidade: number(),
    endereco: string(),
    bairro: string(),
  })

  const { control, handleSubmit, reset, getValues, formState: { errors } } = useForm<CreateUser>({
    resolver: yupResolver(formType),
    defaultValues: {
      nome: '',
      dataNascimento: '',
      email: '',
      celular: '',
      cidade: undefined,
      endereco: undefined,
      bairro: undefined,
    },
  })


  const lista = [
    { name: 'nome', label: 'Nome', tipo: 'texto' },
    { name: 'dataNascimento', label: 'Data de nascimento', tipo: 'dataNascimento' },
    { name: 'email', label: 'E-mail', tipo: 'texto' },
    { name: 'celular', label: 'Celular', tipo: 'celular' },
    { name: 'cidade', label: 'Cidade', tipo: 'texto' },
    { name: 'endereco', label: 'Endereço', tipo: 'texto' },
    { name: 'bairro', label: 'Bairro', tipo: 'texto' },
  ]

  const tipoInput = (props: PropsTipoInput) => {
    switch (props.tipo) {
      case 'texto':
        return <InputTexto label={props.label} name={props.name} control={control} />
        break;
      case 'dataNascimento':
        return <InputDataNascimento label={props.label} name={props.name} control={control} />
        break;
      case 'celular':
        return <InputCelular label={props.label} name={props.name} control={control} />
        break;

      default:
        return <InputTexto label={props.label} name={props.name} control={control} />
        break;
    }
  }

  const renderItem = useCallback((item: any) => (    
    tipoInput(item.item)
  ), []);


  return (
    <S.Container>
      <Header tipo='menu' titulo='Clientes' />
      <FlatList
        data={lista}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 15 }}
        columnWrapperStyle={isTablet() && { gap: 15 }}
        numColumns={isTablet() ? 2 : 1}
        keyExtractor={(item, index) => index.toString()}
      />
    </S.Container>
  )
}