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
import { styles } from './styles'


export default function Menu(props: DrawerContentComponentProps): React.JSX.Element {


    const [indexExpandido, setIndexExpandido] = useState<number | null>(null);


    const menuList = [
        { titulo: 'Home', icone: 'home', tela: 'Home' },
        {
            titulo: 'Configurações', icone: 'gear', filhos: [
                { titulo: 'Cor cabelo natural', tela: 'CorCabelo' },
                { titulo: 'Tipo de raiz', tela: 'CorCabelo' },
                { titulo: 'Curvatura cabelo natural', tela: 'CorCabelo' },
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
            <TouchableOpacity style={[styles.menu, styleMenu(index)]} onPress={() => handleMenuSelecionado(item, index)}>
                <View style={styles.menuItem}>
                    {item.icone != undefined && <Icon name={item.icone} size={26} color="#7d6158" />}
                    <Text style={styles.titulo}>{item.titulo}</Text>
                    {possuiFilhos(item) && <Icon name={itemSelecionado(index) ? 'chevron-up' : 'chevron-down'} size={22} color="#7d6158" style={{ paddingRight: 10 }} />}
                </View>

                {possuiFilhos(item) && itemSelecionado(index) &&
                    <View style={styles.menuItemFilho}>
                        <FlatList
                            data={item.filhos}
                            renderItem={renderItem}
                        />
                    </View>
                }
            </TouchableOpacity>

        )
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={menuList}
                renderItem={renderItem}
                contentContainerStyle={{ gap: 20, marginTop: 15 }}
            />

        </View>

    )
}