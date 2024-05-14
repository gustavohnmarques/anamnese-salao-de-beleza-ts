import React from 'react';
import * as S from "./styles";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Switch } from 'react-native-switch';
import { useTheme } from '../../contexts/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

export type Tipos = "menu" | "voltar";

export type Props = {
    titulo: string,
    tipo: Tipos,
};


export default function Header(props: Props): React.JSX.Element {
    const navigation = useNavigation();
    const { handleChangeTheme, currentTheme, getTheme } = useTheme();

    return (
        <S.Container>
            <S.Menu onPress={() => props.tipo == 'menu' ? navigation.dispatch(DrawerActions.openDrawer()) : navigation.goBack()}>
                {props.tipo == 'menu' ? <S.Icone name='navicon' /> : <S.Icone name='chevron-left' />}
            </S.Menu>
            <S.ContainerTitulo>
                <S.Titulo>{props.titulo}</S.Titulo>
            </S.ContainerTitulo>
            <S.ContainerDark>                
                <Switch
                    value={currentTheme == 'dark' ? true : false}
                    onValueChange={handleChangeTheme}
                    backgroundActive={getTheme().colors.background400}
                    backgroundInactive={'gray'}
                    activeText={''}
                    inActiveText={''}
                    
                    renderInsideCircle={() => <S.IconeTheme name='moon-o' /> }

                />
            </S.ContainerDark>
        </S.Container>
    )
}