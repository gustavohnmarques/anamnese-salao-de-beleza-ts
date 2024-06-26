import React, { LegacyRef, RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import styled, { css } from "styled-components/native";
import { SelectChipProps, SelectItens, SelectProps } from '../../types/InputSelect.type';
import { PorcentagemAlturaTela, PorcentagemLarguraTela } from '../../utils/PorcentagemTela';
import { TamanhoFonte } from '../../utils/TamanhoFonte';
import Icon from 'react-native-vector-icons/FontAwesome';
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
import { ScrollView } from 'react-native-gesture-handler';
import { getAlergias } from '../../db/Alergia';


type Props = {
    onRequestClone?: () => void,
};


export default function ModalSelecionarAlergias(props: Props) {

    const { getTheme } = useTheme();

    const [itensSelecionados, setItensSelecionados] = useState<number[]>([]);

    //Search
    const [searchText, setSearchText] = useState<string>('');


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
        getAlergias({function: setListaAlergia});
    }

    useEffect(() => {
        bottomSheetModalRef.current?.present();
        setTimeout(() => {
            buscarDados();
        }, 100);

    }, [])

    useEffect(() => {
        setListaAlergia([]);
        getAlergias({function: setListaAlergia, search: searchText == '' ? '' : searchText});
    }, [searchText])

    useEffect(() => {

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
    
    const searchAlergia = (searchText: string) => {    
        console.log('TA BUSCANDO AQUI', searchText)    
        getAlergias({function: setListaAlergia, search: searchText == '' ? '' : searchText});
    }

    const renderItem = (item: any) => (
        <Item {...item.item} checked={itensSelecionados.includes(item.index)} handleClick={() => handleClickItem(item.index)} />
    )

    const renderizarItens = () => {
        return (
            <ContainerLista>
                <Input label={'Pesquisar alergia'} value={searchText} onFocus={() => bottomSheetModalRef.current?.snapToIndex(1)} onChange={(searchText: string) => searchAlergia(searchText)} />
                    <ScrollView>
                        <FlatList
                            style={{paddingBottom: 10}}
                            scrollEnabled={false}
                            data={listaAlergia}
                            renderItem={renderItem}
                            contentContainerStyle={{ gap: 15 }}                            
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </ScrollView>                
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
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                onDismiss={props.onRequestClone}
            >
                {renderizarItens()}
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






