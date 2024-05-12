import React from 'react';
import * as S from "./styles";
import { DrawerActions, useNavigation } from "@react-navigation/native";

export type Tipos = "menu" | "voltar";

export type Props = {
    titulo: string,
    tipo: Tipos,
};


export default function Header(props: Props): React.JSX.Element {
    const navigation = useNavigation();
    return (
        <S.Container>            
            <S.Menu onPress={() => props.tipo == 'menu' ? navigation.dispatch(DrawerActions.openDrawer()) :  navigation.goBack()}>
                {props.tipo == 'menu' ? <S.Icone name='navicon' /> : <S.Icone name='chevron-left' />}
            </S.Menu>
            <S.ContainerTitulo>
                <S.Titulo>{props.titulo}</S.Titulo>
            </S.ContainerTitulo>
        </S.Container>
    )
}