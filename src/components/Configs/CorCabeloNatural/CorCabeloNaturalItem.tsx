import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, TextStyle, ViewStyle, Alert } from "react-native";
import * as S from './styles';

export type CorCabeloNatualItemProps = {
    id: Number,
    descricao: string,
    handleEdit: (id: Number) => void,
    handleDelete: (id: Number) => void,
};

export function CorCabeloNaturalItem(props: CorCabeloNatualItemProps): React.JSX.Element {

    const confirmarExclusao = () => {
        Alert.alert('Atenção!', `Deseja excluir ${props.descricao}?`, [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            { text: 'Sim, excluir', onPress: () => props.handleDelete(props.id) },
        ]);
    }

    return (
        <S.Item>
            <S.Descricao >
                <S.TextoDescricao>{props.descricao}</S.TextoDescricao>
            </S.Descricao>
            <S.Acoes>
                <S.ItemAcao onPress={() => props.handleEdit(props.id)}>
                    <Icon name="edit" size={26} color="#9d7cd9" />
                </S.ItemAcao>

                <S.ItemAcao onPress={confirmarExclusao}>
                    <Icon name="trash-o" size={26} color="#ff5f56" />
                </S.ItemAcao>
            </S.Acoes   >
        </S.Item>
    )
}

