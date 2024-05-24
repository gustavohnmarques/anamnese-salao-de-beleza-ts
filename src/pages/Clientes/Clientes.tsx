import { FlatList, Text, View } from 'react-native';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateUser, Input, PropsTipoInput } from './Types';
import { object, string, number } from 'yup';
import * as S from './styles';
import { useTheme } from '../../contexts/theme';
import Header from '../../components/Header/Header';
import React, { useCallback, useEffect, useState } from 'react';
import { isTablet } from 'react-native-device-info';
import { getCamposVisiveisClientes, getCoresCabeloNatural, getCurvaturaCabeloNatural, getTipoRaiz } from './useClientes';
import { SelectItens } from '../../types/InputSelect.type';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { CamposVisiveisClientes } from '../../types/CamposVisiveisClientes.type';

const InputCelular = React.lazy(() => import('../../components/Inputs/InputCelular'));
const InputDataNascimento = React.lazy(() => import('../../components/Inputs/InputDataNascimento'));
const InputTexto = React.lazy(() => import('../../components/Inputs/InputTexto'));
const InputSelect = React.lazy(() => import('../../components/Inputs/InputSelect'));



export default function Clientes(): React.JSX.Element {

  const navigation = useNavigation();

  const [listaCorCabelo, setListaCorCabelo] = useState<SelectItens[]>([]);
  const [listaTipoRaiz, setListaTipoRaiz] = useState<SelectItens[]>([]);
  const [listaCurvatura, setListaCurvatura] = useState<SelectItens[]>([]);
  const [camposVisiveis, setCamposVisiveis] = useState<CamposVisiveisClientes[]>([
    { name: 'nome', label: 'Nome', tipo: 'texto', visivel: true },
    { name: 'dataNascimento', label: 'Data de nascimento', tipo: 'dataNascimento', visivel: false },
    { name: 'email', label: 'E-mail', tipo: 'texto', visivel: false },
    { name: 'celular', label: 'Celular', tipo: 'celular', visivel: false },
    { name: 'cidade', label: 'Cidade', tipo: 'texto', visivel: false },
    { name: 'endereco', label: 'Endereço', tipo: 'texto', visivel: false },
    { name: 'corCabeloNatural', label: 'Cor de cabelo natural', tipo: 'select', itens: listaCorCabelo, visivel: false },
    { name: 'curvaturaNatural', label: 'Curvatura natural', tipo: 'select', itens: listaCurvatura, visivel: false },
    { name: 'tipoRaiz', label: 'Tipo de raiz', tipo: 'select', itens: listaTipoRaiz, visivel: false },
  ]);

  const [alterandoConfiguracoes, setAlterandoConfiguracoes] = useState<Boolean>(false)
  const alterandoConfiguracoesRef = React.useRef(alterandoConfiguracoes);
  const setAlterandoConfiguracoesRef = (data: Boolean) => {
    alterandoConfiguracoesRef.current = data;
    setAlterandoConfiguracoes(data);
  };

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

    item.item.visivel ? tipoInput(item.item) : null
  ), [camposVisiveis]);

  useEffect(() => {
    getCoresCabeloNatural(setListaCorCabelo);
    getTipoRaiz(setListaTipoRaiz);
    getCurvaturaCabeloNatural(setListaCurvatura);
    getCamposVisiveisClientes(verificarCamposVisiveis);

    navigation.addListener('focus', function () {
      buscarCamposVisiveis()
    })

    return () => {
      navigation.removeListener('state', function () {
        buscarCamposVisiveis()
      });
    };
  }, [])

  const verificarCamposVisiveis = (dados: any) => {
    const camposAtuais = camposVisiveis;

    setCamposVisiveis([])

    for (let index = 0; index < Object.keys(dados).length; index++) {
      const indexItem = camposAtuais.findIndex((item) => item.name == Object.keys(dados)[index]);
      if (indexItem >= 0) {
        camposAtuais[indexItem].visivel = Boolean(dados[Object.keys(dados)[index]])
      }

    }

    setCamposVisiveis(camposAtuais);
  }

  const buscarCamposVisiveis = () => {
    if (alterandoConfiguracoesRef.current) {
      //Usuario acessou tela de alteração dos campos, buscar novamente os campos visiveis
      setAlterandoConfiguracoesRef(false);
      getCamposVisiveisClientes(verificarCamposVisiveis)
    }
  }

  const handleClickConfiguracoes = () => {
    setAlterandoConfiguracoesRef(true);
    navigation.dispatch(CommonActions.navigate({ name: 'CamposVisiveis' }))
  }

  return (
    <>
      <Header tipo='menu' titulo='Clientes' componente={<S.Icone name='cog' />} handleClickComponente={handleClickConfiguracoes} />
      <S.Container>
        <S.Titulo>Dados pessoais</S.Titulo>
        
          <FlatList
            data={camposVisiveis.filter((item) => item.visivel)}
            renderItem={renderItem}
            contentContainerStyle={{ gap: 15 }}
            columnWrapperStyle={isTablet() && { gap: 15 }}
            numColumns={isTablet() ? 2 : 1}
            keyExtractor={(item, index) => index.toString()}
            style={{flexGrow: 0}}
          />
        

        <View style={{ backgroundColor: 'blue', flex: 1 }}>
          <S.Titulo>Alergias</S.Titulo>
        </View>
      </S.Container>
    </>

  )
}