import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

export type CorCabeloNatualItemProps = {
    id: Number,
    descricao: string,    
    handleEdit: (id: Number) => void,
    handleDelete: (id: Number) => void,
};

export function CorCabeloNaturalItem(props: CorCabeloNatualItemProps): React.JSX.Element {
    return (
        <View style={styles.item}>
            <View style={styles.descricao}>
                <Text style={styles.textoDescricao}>{props.descricao}</Text>
            </View>
            <View style={styles.acoes}>
                <TouchableOpacity onPress={() => props.handleEdit(props.id)} style={styles.itemAcao}>
                    <View>
                        <Icon name="edit" size={26} color="#9d7cd9" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.handleDelete(props.id)} style={styles.itemAcao}>
                    <View >
                        <Icon name="trash-o" size={26} color="#ff5f56" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        height: 60,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#fff',
        flexDirection: 'row'
    } as ViewStyle,

    descricao: {
        height: '100%',
        width: '80%',        
        justifyContent: 'center',
        paddingLeft: 15
    } as ViewStyle,

    acoes: {
        height: '100%',
        width: '20%',        
        flexDirection: 'row'
    } as ViewStyle,

    itemAcao: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    } as ViewStyle,

    textoDescricao: {
        color: '#747474',
        fontSize: 18
    } as TextStyle,
});
