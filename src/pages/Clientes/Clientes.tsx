import { FlatList, ScrollView } from 'react-native';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateUser, Input, PropsTipoInput } from './Types';
import { object, string, number } from 'yup';
import * as S from './styles';
import { useTheme } from '../../contexts/theme';
import Header from '../../components/Header/Header';
import React, { useCallback, useEffect, useState } from 'react';
import { isTablet } from 'react-native-device-info';
import { getCoresCabeloNatural, getCurvaturaCabeloNatural, getTipoRaiz } from './useClientes';
import { SelectItens } from '../../types/InputSelect.type';
import { Chip } from 'react-native-paper';
import { CommonActions, useNavigation } from '@react-navigation/native';

const InputCelular = React.lazy(() => import('../../components/Inputs/InputCelular'));
const InputDataNascimento = React.lazy(() => import('../../components/Inputs/InputDataNascimento'));
const InputTexto = React.lazy(() => import('../../components/Inputs/InputTexto'));
const InputSelect = React.lazy(() => import('../../components/Inputs/InputSelect'));



export default function Clientes(): React.JSX.Element {

  const navigation = useNavigation();   
  
  const [listaCorCabelo, setListaCorCabelo] = useState<SelectItens[]>([]);
  const [listaTipoRaiz, setListaTipoRaiz] = useState<SelectItens[]>([]);
  const [listaCurvatura, setListaCurvatura] = useState<SelectItens[]>([]);

  const { handleChangeTheme } = useTheme();

  const formType = object({
    nome: string().min(5, 'Informe corretamente o nome.').required('Informe corretamente o nome.'),
    dataNascimento: string().min(10, 'Informe corretamente a data de nascimento.').required('Informe corretamente a data de nascimento.'),
    email: string().email('Informe corretamente o e-mail.').required('Informe corretamente o e-mail.'),
    celular: string().min(17, 'Informe corretamente o celular.').required('Informe corretamente o celular.'),
    cidade: number(),
    endereco: string(),
    bairro: string(),
    corCabeloNatural: string(),
    tipoRaiz: string(),
    curvaturaNatural: string(),
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
      corCabeloNatural: '',
      tipoRaiz: '',
      curvaturaNatural: ''
    },
  })

  const lista = [
    { name: 'nome', label: 'Nome', tipo: 'texto' },
    { name: 'dataNascimento', label: 'Data de nascimento', tipo: 'dataNascimento' },
    { name: 'email', label: 'E-mail', tipo: 'texto' },
    { name: 'celular', label: 'Celular', tipo: 'celular' },
    { name: 'cidade', label: 'Cidade', tipo: 'texto' },
    { name: 'endereco', label: 'Endereço', tipo: 'texto' },
    { name: 'corCabeloNatural', label: 'Cor de cabelo natural', tipo: 'select', itens: listaCorCabelo },
    { name: 'curvaturaNatural', label: 'Curvatura natural', tipo: 'select', itens: listaCurvatura },
    { name: 'tipoRaiz', label: 'Tipo de raiz', tipo: 'select', itens: listaTipoRaiz },
  ]

  const tipoInput = (props: PropsTipoInput) => {
    switch (props.tipo) {
      case 'texto':
        return <InputTexto label={props.label} name={props.name} control={control} />

      case 'dataNascimento':
        return <InputDataNascimento label={props.label} name={props.name} control={control} />

      case 'celular':
        return <InputCelular label={props.label} name={props.name} control={control} />

      case 'select':
        return <InputSelect label={props.label} name={props.name} control={control} itens={props.itens} />

      default:
        return <InputTexto label={props.label} name={props.name} control={control} />
    }
  }

  const renderItem = useCallback((item: any) => (
    tipoInput(item.item)
  ), [listaTipoRaiz]);

  useEffect(() => {
    getCoresCabeloNatural(setListaCorCabelo);
    getTipoRaiz(setListaTipoRaiz);
    getCurvaturaCabeloNatural(setListaCurvatura);
  }, [])



  return (
    <>
      <Header tipo='menu' titulo='Clientes' componente={<S.Icone name='cog' />} handleClickComponente={() => navigation.dispatch(CommonActions.navigate({ name: 'CamposVisiveis' }))} />
      <S.Container>
        <S.Titulo>Dados pessoais</S.Titulo>
        <FlatList
          data={lista}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 15 }}
          columnWrapperStyle={isTablet() && { gap: 15 }}
          numColumns={isTablet() ? 2 : 1}
          keyExtractor={(item, index) => index.toString()}
        />
        <S.Titulo>Alergias</S.Titulo>
      </S.Container>
    </>

  )
}