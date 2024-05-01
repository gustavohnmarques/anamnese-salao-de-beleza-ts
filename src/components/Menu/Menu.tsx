import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    StyleSheet,
    Switch,
    Alert,
    FlatList,
    ListRenderItem,
    ListRenderItemInfo,
    ViewStyle,
    TextStyle,
} from "react-native";
import { MenuItemProps } from './types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";
import { DrawerContentComponentProps } from "@react-navigation/drawer";


export default function Menu(props: DrawerContentComponentProps): React.JSX.Element {
    

    const [indexExpandido, setIndexExpandido] = useState<number | null>(null);


    const menuList = [
        { titulo: 'Home', icone: 'home', tela: 'Home' },
        {
            titulo: 'Configurações', icone: 'gear', filhos: [
                { titulo: 'Cor cabelo natural', tela: 'CorCabelo' },
                { titulo: 'Tipo de raiz', tela: 'CorCabelo'  },
                { titulo: 'Curvatura cabelo natural', tela: 'CorCabelo'  },
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

    function renderChildren({ item, index }: ListRenderItemInfo<MenuItemProps>): React.JSX.Element {
        return (
            <View style={styles.menuItemFilho}>
                <Text style={styles.titulo}>{item.titulo}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Help"
                    onPress={() => Alert.alert('testando')}
                />

            </DrawerContentScrollView> */}
            {/* <TouchableOpacity onPress={() => navigation.navigate('CorCabelo', { id: 0 })} style={styles.botao}>
                <View >
                    <Text>Aqui abrir</Text>
                </View>
            </TouchableOpacity> */}



            <FlatList
                data={menuList}
                renderItem={renderItem}
                contentContainerStyle={{ gap: 20, marginTop: 15 }}
            />

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#f8f4f3',
        paddingHorizontal: 20,
    } as ViewStyle,

    menu: {
        borderRadius: 5,
        alignItems: 'center',
    } as ViewStyle,

    menuItem: {
        flex: 1,
        height: 60,
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
    } as ViewStyle,

    titulo: {
        fontSize: 18,
        color: '#402e28',
        fontFamily: 'Roboto-Medium',
        letterSpacing: 1.2,
        paddingLeft: 15,
        flex: 1,
    } as TextStyle,

    menuItemFilho: {
        flex: 1,
        width: '100%',
        padding: 15
    } as ViewStyle,
});