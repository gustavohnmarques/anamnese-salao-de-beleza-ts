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
import { getAlergias, getCamposVisiveisClientes, getCoresCabeloNatural, getCurvaturaCabeloNatural, getTipoRaiz } from './useClientes';
import { ItemRemover, SelectItens } from '../../types/InputSelect.type';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { CamposVisiveisClientes } from '../../types/CamposVisiveisClientes.type';
import { Button, Chip } from 'react-native-paper';
import InputSelectChip from '../../components/inputs/InputSelectChip';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalSelecionarAlergias from '../../components/ModalSelecionarAlergias/ModalSelecionarAlergias';
import SwitchTema from '../../components/SwitchTema/SwitchTema';

const InputCelular = React.lazy(() => import('../../components/inputs/InputCelular'));
const InputDataNascimento = React.lazy(() => import('../../components/inputs/InputDataNascimento'));
const InputTexto = React.lazy(() => import('../../components/inputs/InputTexto'));
const InputSelect = React.lazy(() => import('../../components/inputs/InputSelect'));



export default function Clientes(): React.JSX.Element {

  const navigation = useNavigation();

  const [carregando, setCarregando] = useState<Boolean>(true);

  const [selecionarAlergia, setSelecionarAlergia] = useState<Boolean>(false);
  const [listaCorCabelo, setListaCorCabelo] = useState<SelectItens[]>([]);
  const [listaTipoRaiz, setListaTipoRaiz] = useState<SelectItens[]>([]);
  const [listaCurvatura, setListaCurvatura] = useState<SelectItens[]>([]);
  const [listaAlergia, setListaAlergia] = useState<SelectItens[]>([]);
  const [camposVisiveis, setCamposVisiveis] = useState<CamposVisiveisClientes[]>([
    { name: 'nome', label: 'Nome', tipo: 'texto', visivel: true },
    { name: 'dataNascimento', label: 'Data de nascimento', tipo: 'dataNascimento', visivel: false },
    { name: 'email', label: 'E-mail', tipo: 'texto', visivel: false },
    { name: 'celular', label: 'Celular', tipo: 'celular', visivel: false },
    { name: 'cidade', label: 'Cidade', tipo: 'texto', visivel: false },
    { name: 'endereco', label: 'Endereço', tipo: 'texto', visivel: false },
    { name: 'corCabeloNatural', label: 'Cor de cabelo natural', tipo: 'select', itens: [], visivel: false },
    { name: 'curvaturaNatural', label: 'Curvatura natural', tipo: 'select', itens: [], visivel: false },
    { name: 'tipoRaiz', label: 'Tipo de raiz', tipo: 'select', itens: [], visivel: false },
  ]);

  const [alterandoConfiguracoes, setAlterandoConfiguracoes] = useState<Boolean>(false)
  const alterandoConfiguracoesRef = React.useRef(alterandoConfiguracoes);
  const setAlterandoConfiguracoesRef = (data: Boolean) => {
    alterandoConfiguracoesRef.current = data;
    setAlterandoConfiguracoes(data);
  };

  //Alergias selecionadas
  const [listaAlergiaSelecionada, setListaAlergiaSelecionada] = useState<number[]>([]);

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
    getCamposVisiveisClientes(verificarCamposVisiveis);
    // getCoresCabeloNatural(setListaCorCabelo);
    // getTipoRaiz(setListaTipoRaiz);
    // getCurvaturaCabeloNatural(setListaCurvatura);    
    getAlergias(setListaAlergia);
    navigation.addListener('focus', function () {
      buscarCamposVisiveis()
    })

    return () => {
      navigation.removeListener('state', function () {
        buscarCamposVisiveis()
      });
    };
  }, [])

  // useEffect(() => {
  //   if (camposVisiveis.length) {
  //     verificarCamposComDados()
  //   }
  // }, [camposVisiveis])

  const verificarCamposComDados = async () => {
    try {
      for (let index = 0; index < camposVisiveis.length; index++) {
        //Verificar se algum campo visivel precisa de buscar dados no banco
        if (camposVisiveis[index].tipo == 'select' && camposVisiveis[index].visivel && !camposVisiveis[index].itens?.length) {
          switch (camposVisiveis[index].name) {
            case 'corCabeloNatural':
              await getCoresCabeloNatural((res: SelectItens[]) => atualizarCampoSelect(res, camposVisiveis[index].name))
              break;
            case 'curvaturaNatural':
              console.log('chegou curvatura')
              await getCurvaturaCabeloNatural((res: SelectItens[]) => atualizarCampoSelect(res, camposVisiveis[index].name))
              break;
            case 'tipoRaiz':
              await getTipoRaiz((res: SelectItens[]) => atualizarCampoSelect(res, camposVisiveis[index].name))
              break;
          }
        }

      }
    } catch (error) {
      console.log(error)
    }
  }

  const atualizarCampoSelect = async (dados: SelectItens[], name: string) => {
    //Popular o campo select com os dados recebidos do banco
    const listaAtual = [...camposVisiveis];
    listaAtual[listaAtual.findIndex((item) => item.name == name)].itens = dados;
    setCamposVisiveis(listaAtual);
  }

  useEffect(() => {
    setCarregando(false)
    console.log(listaAlergia)
  }, [listaAlergia])

  const verificarCamposVisiveis = (dados: any) => {
    try {
      const camposAtuais = camposVisiveis.map((item) => item.itens!?.length > 0 ? {...item, itens: []} : item); //Limpar dados dos selects da memoria

      setCamposVisiveis([])
      //Verificar quais campos estão visiveis 
      for (let index = 0; index < Object.keys(dados).length; index++) {
        const indexItem = camposAtuais.findIndex((item) => item.name == Object.keys(dados)[index]);
        if (indexItem >= 0) {
          camposAtuais[indexItem].visivel = Boolean(dados[Object.keys(dados)[index]])
        }
  
      }
  
      setCamposVisiveis(camposAtuais);
    } catch (error) {
      console.log(error)
    }
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

  const handleClickAdicionarAlercia = (item: number) => {
    if (item != undefined) {
      const itens = [...listaAlergiaSelecionada];
      itens.push(item);
      setListaAlergiaSelecionada(itens);
      console.log('CLICADO', listaAlergiaSelecionada)
    }
  }

  const identificarDescricaoAlergiaPorID = (id: number) => {
    const item = listaAlergia.filter((item) => item.value == String(id))
    console.log(item)
    return item.length > 0 ? item[0].label : ''
  }

  const renderItemAlergia = useCallback((item: any) => (
    <Chip closeIcon="close" onPress={() => console.log('Pressed')} onClose={() => removerItemListaAlergia(item.item)}>{identificarDescricaoAlergiaPorID(item.item)}</Chip>
  ), [listaAlergiaSelecionada]);

  const removerItemListaAlergia = (id: number) => {
    if (id != undefined) {
      const itens = listaAlergiaSelecionada.filter((item) => item != id);
      setListaAlergiaSelecionada(itens);
    }
  }

        
  return (
    <>
      <Header tipo='menu' titulo='Clientes' componente={<SwitchTema />} handleClickComponente={handleClickConfiguracoes} />            
      <S.Container>      
        <S.Titulo>Dados pessoais</S.Titulo>

      <Button onPress={() => setSelecionarAlergia(true)}>Mostrar</Button>
        {/* <FlatList
          scrollEnabled={false}
          data={camposVisiveis.filter((item) => item.visivel)}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 15 }}
          columnWrapperStyle={isTablet() && { gap: 15 }}
          numColumns={isTablet() ? 2 : 1}
          keyExtractor={(item, index) => index.toString()}
          style={{ flexGrow: 0 }}
        /> */}


        {/* {!carregando &&
          <>
            <View style={{ flex: 1 }}>
              <S.Titulo>Alergias</S.Titulo>
              <S.ContainerAdicionarAlergia>
                <InputSelectChip itens={listaAlergia} label='Adicionar' onChange={(item) => handleClickAdicionarAlercia(item)} itensRemover={listaAlergiaSelecionada} />
              </S.ContainerAdicionarAlergia>

              <FlatList
                scrollEnabled={false}
                data={listaAlergiaSelecionada}
                renderItem={renderItemAlergia}
                contentContainerStyle={{ gap: 10 }}
                columnWrapperStyle={isTablet() && { gap: 15 }}
                numColumns={isTablet() ? 3 : 1}
                keyExtractor={(item, index) => index.toString()}
                style={{ flexGrow: 0, marginTop: 10 }}
              />

              <S.Titulo>Alergias</S.Titulo>
              <S.ContainerAdicionarAlergia>
                <InputSelectChip itens={listaAlergia} label='Adicionar' onChange={(item) => handleClickAdicionarAlercia(item)} itensRemover={listaAlergiaSelecionada} />
              </S.ContainerAdicionarAlergia>

              <FlatList
                scrollEnabled={false}
                data={listaAlergiaSelecionada}
                renderItem={renderItemAlergia}
                contentContainerStyle={{ gap: 10 }}
                numColumns={isTablet() ? 3 : 1}
                keyExtractor={(item, index) => index.toString()}
                style={{ flexGrow: 0, marginTop: 10 }}
              />


            </View>
          </>


        } */}
      </S.Container>
      {selecionarAlergia && <ModalSelecionarAlergias onRequestClone={() => setSelecionarAlergia(false)} />}      
    </>

  )
}