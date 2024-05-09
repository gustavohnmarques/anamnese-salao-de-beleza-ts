import React from 'react';
import * as S from './styles'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../../contexts/theme';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { Props, PropsSubitem } from './types';
import { DrawerContentComponentProps, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { ParamListBase } from '@react-navigation/native';
import {useNavigation} from "@react-navigation/native"

export default function Configuracoes(): React.JSX.Element {

  const navigation = useNavigation()

  const { getTheme } = useTheme();
  
  const menus = [
    {
      titulo: 'Plano',
      itens: [
        {
          titulo: 'Alterar plano',
          subtitulo: 'Gratuito',
          tela: ''
        }
      ],
    },
    {
      titulo: 'Backup',
      itens: [
        {
          titulo: 'Backup na nuvem',
          subtitulo: '',
          tela: ''
        }
      ],
    },
    {
      titulo: 'Cadastros',
      itens: [
        {
          titulo: 'Cor de cabelo natural',
          subtitulo: '',
          tela: ''
        },
        {
          titulo: 'Tipo de raiz',
          subtitulo: '',
          tela: ''
        },
        {
          titulo: 'Curvatura do cabelo natural',
          subtitulo: '',
          tela: ''
        },
        {
          titulo: 'Alergia',
          subtitulo: '',
          tela: ''
        },
      ],
    }
  ]

  function renderSubItem({ item, index }: ListRenderItemInfo<PropsSubitem>): React.JSX.Element {
    return (
      <S.Item onPress={() => handleClick(item.tela)}>
        <S.TituloItem>{item.titulo}</S.TituloItem>
        <S.ItemAcao>
          <S.SubTituloItem>{item.subtitulo}</S.SubTituloItem>
          <Icon name={'chevron-right'} size={21} color={getTheme().colors.textColor} style={{ opacity: 0.6 }} />
        </S.ItemAcao>
      </S.Item>
    )
  }

  function renderItem({ item, index }: ListRenderItemInfo<Props>): React.JSX.Element {
    return (
      <>
        <S.TituloContainer>{item.titulo}</S.TituloContainer>
        <S.ContainerItem>
          <FlatList
            data={item.itens}
            renderItem={renderSubItem}
            contentContainerStyle={{ marginTop: 15 }}
          />
        </S.ContainerItem>
      </>
    )
  }

  const handleClick = (tela: string) => {            
    //navigation.navigate()
    //console.log(navigation.jum)
  }


  return (
    <S.Container>
      <FlatList
        data={menus}
        renderItem={renderItem}
        contentContainerStyle={{ marginTop: 15 }}
      />
    </S.Container>

  )
}