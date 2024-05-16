import {FlatList,ListRenderItemInfo} from "react-native";
import { MenuItemProps } from './types';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from "react";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import * as S from './styles';
import { useTheme } from "../../contexts/theme";

export default function Menu(props: DrawerContentComponentProps): React.JSX.Element {


    const { getTheme } = useTheme();    

    const [indexMenuSelecionado, setIndexMenuSelecionado] = useState<number>(0);

    const menuList = [
        { titulo: 'Home', icone: 'home', tela: 'Home' },
        { titulo: 'Configurações', icone: 'gear', tela: 'Configuracoes'},
    ]

    const handleMenuSelecionado = (item: MenuItemProps, index: number) => {
        props.navigation.navigate(item.tela ?? 'Home')
        setIndexMenuSelecionado(index)
    }

    const itemSelecionarStyle = () => {
        return {
            backgroundColor: getTheme().colors.background400,
            borderColor: getTheme().colors.background500,
            borderWidth: 1
        }
    }

    function renderItem({ item, index }: ListRenderItemInfo<MenuItemProps>): React.JSX.Element {
        return (
            <S.Menu style={indexMenuSelecionado == index && itemSelecionarStyle()} onPress={() => handleMenuSelecionado(item, index)}>
                <Icon name={item.icone} size={21} color={getTheme().colors.textoMenu} style={{opacity: indexMenuSelecionado == index ? 1.0 : 0.7}} />
                <S.Titulo style={{opacity: indexMenuSelecionado == index ? 1.0 : 0.7}}>{item.titulo}</S.Titulo>
            </S.Menu>
        )
    }


    return (
        <S.Container>
            <FlatList
                data={menuList}
                renderItem={renderItem}
                contentContainerStyle={{ marginTop: 15 }}
            />
        </S.Container>
    )
}