import { Alert, Button, FlatList, Text, TextInput, View } from 'react-native';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number } from 'yup';
import { useEffect, useRef, useState } from 'react';
import SQLite from 'react-native-sqlite-storage';
import { atualizarTipoRaiz, deleteTipoRaiz, getTipoRaiz, novoTipoRaiz } from './useTipoRaiz';
import { ListaTipoRaiz } from './types';
import { CorCabeloNaturalItem } from '../../../components/Configs/CorCabeloNatural/CorCabeloNaturalItem';
import NovoItem, { Cadastro } from '../../../components/Configs/NovoItem/NovoItem';
import React from 'react';
import Header from '../../../components/Header/Header';
import * as S from './styles'
import ListaVazia from '../../../components/Geral/ListaVazia/ListaVazia';
import Skeleton from './componentes/Skeleton';



export default function TipoRaiz(): React.JSX.Element {

    const [listaTipoRaiz, setListaTipoRaiz] = useState<ListaTipoRaiz[] | null>(null);
    const [indexItemEditando, setIndexItemEditando] = useState<number | null>(null);

    const refInput = useRef<TextInput>(null);

    useEffect(() => {
        getTipoRaiz(setListaTipoRaiz);
    }, [])

    const handleDelete = async (id: Number) => {
        deleteTipoRaiz(id);
        setListaTipoRaiz(listaTipoRaiz!?.filter(item => item.id != id));
    }

    const handleEdit = (id: Number) => {
        const item = listaTipoRaiz!.findIndex(item => item.id == id);
        setIndexItemEditando(item >= 0 ? item : null);
        refInput.current?.focus();
    }

    const handleNovoItem = async (props: Cadastro) => {
        //Verificar se algum item está sendo editado
        if (indexItemEditando != null) {
            atualizarTipoRaiz({ descricao: props.descricao, id: listaTipoRaiz![indexItemEditando].id });
        } else {
            novoTipoRaiz(props);
        }
        getTipoRaiz(setListaTipoRaiz);
        cancelarEdicaoItem(); //Limpar item editado no momento
    }

    const novoItemJaExiste = (value: string) => {
        const validacao = listaTipoRaiz?.findIndex(item => item?.descricao == value.trim());        
        if (validacao == undefined || validacao >= 0) {
            //Verificar se está editando e não validar com o mesmo item
            if (indexItemEditando != null && validacao == indexItemEditando) {                
                return true;
            }
            return false;
        }
        return true
    }

    const cancelarEdicaoItem = () => {
        setIndexItemEditando(null); //Limpar item editado no momento
        refInput.current?.blur();
    }

    function renderItem(item: any): React.JSX.Element {
        return <CorCabeloNaturalItem {...item.item} handleDelete={handleDelete} handleEdit={handleEdit} key={String(item.id)} />
    }

    return (
        <>
            <Header tipo='voltar' titulo='Cadastro de tipo de raiz' />
            <S.Container>
                <NovoItem funcaoRetorno={handleNovoItem} funcaoValidacao={novoItemJaExiste} valor={indexItemEditando != null ? listaTipoRaiz![indexItemEditando]?.descricao ?? '' : ''} refInput={refInput} funcaoCancelar={cancelarEdicaoItem} />

                {listaTipoRaiz != null &&
                    <>
                        {
                            listaTipoRaiz.length > 0 ?
                                <FlatList
                                    data={listaTipoRaiz}
                                    renderItem={renderItem}
                                    contentContainerStyle={{ gap: 15, paddingBottom: 20 }}
                                />

                                :
                                <ListaVazia mensagem='Nenhum tipo de raiz cadastrado' />
                        }
                    </>
                }


            </S.Container>
        </>


    )
}