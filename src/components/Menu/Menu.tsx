import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ListRenderItemInfo,
} from "react-native";
import { MenuItemProps } from './types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import * as S from './styles';
import { useTheme } from "../../contexts/theme";
import { Theme } from "../../templates/theme";


export default function Menu(props: DrawerContentComponentProps): React.JSX.Element {


    const { getTheme } = useTheme();

    const [indexExpandido, setIndexExpandido] = useState<number | null>(null);


    const menuList = [
        { titulo: 'Home', icone: 'home', tela: 'Home',  filho: false },
        {
            titulo: 'Configurações', icone: 'gear',  filho: false, filhos: [
                { titulo: 'Cor cabelo natural', tela: 'CorCabelo', filho: true },
                { titulo: 'Tipo de raiz', tela: 'CorCabelo', filho: true },
                { titulo: 'Curvatura cabelo natural', tela: 'CorCabelo', filho: true },
            ]
        },
    ]

    const possuiFilhos = (item: MenuItemProps) => {
        return (item.filhos != undefined && item.filhos?.length > 0)
    }

    const itemSelecionado = (index: number) => {
        return index == indexExpandido;
    }

    const handleMenuSelecionado = (item: MenuItemProps, index: number) => {
        if (item.filhos != undefined && item.filhos?.length > 0) {
            setIndexExpandido(index == indexExpandido ? null : index);
        } else {
            setIndexExpandido(null)
            props.navigation.navigate(item.tela ?? 'Home')
        }
    }

    const styleMenu = (index: number) => {
        return itemSelecionado(index) ? { flex: 1 } : { height: 60 }
    }

    function renderItem({ item, index }: ListRenderItemInfo<MenuItemProps>): React.JSX.Element {
        return (
            <S.Menu style={[styleMenu(index), {borderBottomWidth: item.filho ? 0 : 1}]} onPress={() => handleMenuSelecionado(item, index)}>
                <S.MenuItem>
                    {item.icone != undefined && <Icon name={item.icone} size={19} color={getTheme().colors.textColor} />}
                    <S.Titulo>{item.titulo}</S.Titulo>
                    {possuiFilhos(item) && <Icon name={itemSelecionado(index) ? 'chevron-up' : 'chevron-down'} size={18} color={getTheme().colors.textColor} style={{ paddingRight: 10 }} />}
                </S.MenuItem>

                {possuiFilhos(item) && itemSelecionado(index) &&
                    <S.MenuItemFilho>
                        <FlatList
                            data={item.filhos}
                            renderItem={renderItem}
                        />
                    </S.MenuItemFilho>
                }
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