import React, { LegacyRef, RefObject, useCallback, useMemo, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import styled, { css } from "styled-components/native";
import { SelectChipProps, SelectItens, SelectProps } from '../../types/InputSelect.type';
import { PorcentagemAlturaTela, PorcentagemLarguraTela } from '../../utils/PorcentagemTela';
import { TamanhoFonte } from '../../utils/TamanhoFonte';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAlergias } from '../../pages/Clientes/useClientes';
import Picker from 'react-native-picker-select';
import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export default function InputSelectChip(props: SelectChipProps): React.JSX.Element {

    const [listaAlergia, setListaAlergia] = useState<SelectItens[]>([]);

    const refInput = useRef<RNPickerSelect>(null);

    const listaFormatada = () => {
        return props.itensRemover != undefined ? props.itens.filter((item) => !props.itensRemover?.includes(item.value as never)) : props.itens;
    }

    const buscarDados = () => {
        console.log(refInput.current?.togglePicker(true, () => { console.log('FOI EM') }))
        //getAlergias(setListaAlergia);
    }

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const snapPoints = useMemo(() => ['25%', '50%', '95%'], []);

    return (
        <>
            <View style={styles.container}>
                <BottomSheet
                    snapPoints={snapPoints}
                    ref={bottomSheetRef}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetView style={styles.contentContainer}>
                        <Text>Awesome 🎉</Text>
                    </BottomSheetView>
                </BottomSheet>
            </View>
        </>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

const Container = styled.TouchableOpacity`    
    ${({ theme }) => css`        
        display: flex;
        padding: 10px;
        background-color: red;
        height: 300;
    `}
`

const Input = styled.View`    
    ${({ theme }) => css`        
        background-color: #e7e1eb;
        border-radius: 10px;
        padding: 8px 5px;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
    `}
`

const Texto = styled.Text`    
    ${({ theme }) => css`        
        font-size: ${TamanhoFonte(1.6)};
        color: ${theme.colors.primary100};
        font-family: 'Roboto-Medium';
        letter-spacing: 1.2px;
        opacity: 0.9;
    `}
`

export const Icone = styled(Icon)`    
    ${({ theme }) => css`
        color: ${theme.colors.primary100};
        font-size: ${TamanhoFonte(1.8)};        
    `}
`

