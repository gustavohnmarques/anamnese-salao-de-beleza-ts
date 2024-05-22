import React from 'react';
import * as S from "./styles";
import { DrawerActions, useNavigation } from "@react-navigation/native";


export type Tipos = "menu" | "voltar";

export type Props = {
    titulo: string,
    tipo: Tipos,
    componente?: React.JSX.Element,
    handleClickComponente?: () => void,
    handleClickVoltar?: () => void,
};


export default function Header(props: Props): React.JSX.Element {
    const navigation = useNavigation();    

    return (
        <S.Container>
            <S.Menu onPress={() => props.tipo == 'menu' ? navigation.dispatch(DrawerActions.openDrawer()) : props.handleClickVoltar != undefined ? props.handleClickVoltar() : navigation.goBack()}>
                {props.tipo == 'menu' ? <S.Icone name='navicon' /> : <S.Icone name='chevron-left' />}
            </S.Menu>
            <S.ContainerTitulo>
                <S.Titulo>{props.titulo}</S.Titulo>
            </S.ContainerTitulo>
            <S.ContainerDark onPress={props.handleClickComponente}>                
                {props.componente}
            </S.ContainerDark>
        </S.Container>
    )
}