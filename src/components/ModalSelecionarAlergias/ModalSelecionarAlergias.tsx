import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from "styled-components/native";
import { SelectItens } from '../../types/InputSelect.type';
import { PorcentagemAlturaTela } from '../../utils/PorcentagemTela';
import { FlatList } from 'react-native';
import { useTheme } from '../../contexts/theme';
import { BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import { ScrollView } from 'react-native-gesture-handler';
import { getAlergias } from '../../db/Alergia';
import { ChipsListItems } from '../ChipsList/types';

const ChipsList = React.lazy(() => import('../ChipsList/ChipsList'));
const DefaultButton = React.lazy(() => import('../Button/DefaultButton'));
const Item = React.lazy(() => import('./components/Item'));
const Input = React.lazy(() => import('./components/Input'));
const Loader = React.lazy(() => import('../Loader/Loader'));


type Props = {
    onRequestClone?: () => void,
    items?: number[],
};


export default function ModalSelecionarAlergias({ items = [], ...props}: Props) {

    const { getTheme } = useTheme();

    const [itensSelecionados, setItensSelecionados] = useState<number[]>(items);
    const [searchText, setSearchText] = useState<string>('');
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['90%'], []);
    const [listaAlergia, setListaAlergia] = useState<SelectItens[]>([]);
    const [selectedItems, setSelectedItems] = useState<ChipsListItems[]>([]);

    useEffect(() => {
        setTimeout(() => {            
            bottomSheetModalRef.current?.present();
            setTimeout(() => {
                buscarDados();
            }, 500);
        }, 500);
    }, [])

    const buscarDados = () => {
        getAlergias({ function: setListaAlergia });
    }

    const handleClickItem = (item: any) => {
        try {
            let items = [...selectedItems];

            //Verificar se o item já está na lista
            if (selectedItems.findIndex(i => i.id == item.item.value) >= 0) {
                items = selectedItems.filter(i => i.id != item.item.value);
            } else {
                items.push({ id: item.item.value, label: item.item.label });
            }
            
            setSelectedItems(items)
        } catch (error) {
            console.error(error)
        }
    }

    const searchAlergia = (searchText: string) => {
        getAlergias({ function: setListaAlergia, search: searchText == '' ? '' : searchText });
    }

    const renderItem = (item: any) => (
        <Item {...item.item} checked={itensSelecionados.includes(item.index)} handleClick={() => handleClickItem(item)} />
    )

    const removeItem = (id: number) => {
        try {
            const newList = selectedItems.filter(item => item.id != id)
            setSelectedItems(newList)
        } catch (error) {
            console.error(error)
        }
    }

    const renderizarItens = () => {
        return (
            <ContainerLista>

                <Input label={'Pesquisar alergia'} value={searchText} onChange={searchAlergia} />
                {selectedItems.length > 0 && <ChipsList items={selectedItems} onClose={removeItem} />}

                <ContainerItem>
                    <ScrollView>
                        <FlatList
                            style={{ paddingBottom: 10 }}
                            scrollEnabled={false}
                            data={listaAlergia}
                            renderItem={renderItem}
                            contentContainerStyle={{ gap: 15 }}
                            keyExtractor={(item) => item.value}
                        />
                    </ScrollView>
                </ContainerItem>

                <ContainerBotao>
                    <DefaultButton type='primary' text='Confirmar' onPress={() => { }} />
                </ContainerBotao>


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
                onDismiss={props.onRequestClone}
            >
                {!listaAlergia.length ? <Loader /> : renderizarItens()}
            </BottomSheetModal>
        </BottomSheetModalProvider>
    );
}


const ContainerLista = styled.View`
    ${({ theme }) => css`
        display: flex;
        flex: 1;        
        padding: 20px;        
    `}
`

const ContainerItem = styled.View`
    ${({ theme }) => css`
        display: flex;
        flex: 1;         
    `}
`

const ContainerBotao = styled.View`
    ${({ theme }) => css`
        padding-top: 10px;
        width: 100%;
        height: ${PorcentagemAlturaTela(7)}
    `}
`






