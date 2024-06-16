import React, { LegacyRef, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import styled, { css } from "styled-components/native";
import { SelectChipProps, SelectItens, SelectProps } from '../../types/InputSelect.type';
import { PorcentagemAlturaTela, PorcentagemLarguraTela } from '../../utils/PorcentagemTela';
import { TamanhoFonte } from '../../utils/TamanhoFonte';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAlergias } from '../../pages/Clientes/useClientes';
import Picker from 'react-native-picker-select';
import { Button, FlatList, StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../contexts/theme';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackgroundProps,
} from '@gorhom/bottom-sheet';
import { ActivityIndicator } from 'react-native-paper';
import InputTexto from '../Inputs/InputTexto';

import Item from './components/Item';
import Input from './components/Input';


type Props = {
    onRequestClone?: () => void,
};


export default function ModalSelecionarAlergias(props: Props) {

    const { getTheme } = useTheme();

    const [itensSelecionados, setItensSelecionados] = useState<number[]>([]);


    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['50%', '80%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const [listaAlergia, setListaAlergia] = useState<SelectItens[]>([]);

    const buscarDados = () => {
        getAlergias(setListaAlergia);
    }

    useEffect(() => {
        bottomSheetModalRef.current?.present();
        setTimeout(() => {
            buscarDados();
        }, 100);

    }, [])

    useEffect(() => {
        console.log(listaAlergia.length)
    }, [listaAlergia])

    const loader = () => {
        return (
            <ContainerLoader>
                <ActivityIndicator animating={true} color={getTheme().colors.textoMenu} size={'large'} />
            </ContainerLoader>
        )
    }
    
    const handleClickItem = (index: number) => {
        try {
            let lista = itensSelecionados;

            //Verificar se o item já está na lista
            if (itensSelecionados.includes(index)) {
                lista = itensSelecionados.filter((item: number) => item != index);
            } else {
                lista.push(index);
            }

            setItensSelecionados(lista);
        } catch (error) {

        }
    }

    const renderItem = useCallback((item: any) => (
        <Item {...item.item} checked={itensSelecionados.includes(item.index)} handleClick={() => handleClickItem(item.index)} />
    ), [listaAlergia]);

    const renderizarItens = () => {
        return (
            <ContainerLista>
                <Input onFocus={() => bottomSheetModalRef.current?.snapToIndex(1)} />
                <FlatList
                    data={listaAlergia}
                    renderItem={renderItem}
                    contentContainerStyle={{ gap: 15 }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ContainerLista>
        )
    }

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                backgroundStyle={{
                    backgroundColor: getTheme().colors.background400,
                }}
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                onDismiss={props.onRequestClone}
            >
                {!listaAlergia.length ? loader() : renderizarItens()}
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}

const ContainerLoader = styled(BottomSheetView)`
    ${({ theme }) => css`
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;        
    `}
`

const ContainerLista = styled.View`
    ${({ theme }) => css`
        display: flex;
        flex: 1;        
        padding: 20px;        
    `}
`






