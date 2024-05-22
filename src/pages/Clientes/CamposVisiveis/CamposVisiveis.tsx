import React, { useCallback, useState } from 'react';
import * as S from './styles';
import { FlatList, ListRenderItemInfo, ScrollView } from 'react-native';
import { object, boolean } from 'yup';
import { ConfigUser } from './types';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputSwitch from '../../../components/Inputs/InputSwitch';
import { isTablet } from 'react-native-device-info';
import Header from '../../../components/Header/Header';

type Props = {
    name: "nome" | "dataNascimento" | "email" | "celular" | "cidade" | "endereco" | "bairro" | "corCabeloNatural" | "tipoRaiz" | "curvaturaNatural",
    label: string,
    disabled: boolean
}

export default function CamposVisiveis(): React.JSX.Element {

    const [campos, setCampos] = useState<Props[]>([
        { name: 'nome', label: 'Nome', disabled: true, },
        { name: 'dataNascimento', label: 'Data de nascimento', disabled: false },
        { name: 'email', label: 'E-mail', disabled: false },
        { name: 'celular', label: 'Celular', disabled: false },
        { name: 'cidade', label: 'Cidade', disabled: false },
        { name: 'endereco', label: 'Endereço', disabled: false },
        { name: 'bairro', label: 'Bairro', disabled: false },
        { name: 'corCabeloNatural', label: 'Cor de cabelo natural', disabled: false },
        { name: 'tipoRaiz', label: 'Tipo raiz', disabled: false },
        { name: 'curvaturaNatural', label: 'Curvatura natural', disabled: false },
    ]);

    const formType = object({
        nome: boolean().required(),
        dataNascimento: boolean().required(),
        email: boolean().required(),
        celular: boolean().required(),
        cidade: boolean().required(),
        endereco: boolean().required(),
        bairro: boolean().required(),
        corCabeloNatural: boolean().required(),
        tipoRaiz: boolean().required(),
        curvaturaNatural: boolean().required(),
    })

    const { control, handleSubmit, reset, getValues, setValue, formState: { errors } } = useForm<ConfigUser>({
        resolver: yupResolver(formType),
        defaultValues: {
            nome: true,
            dataNascimento: true,
            email: true,
            celular: true,
            cidade: true,
            endereco: true,
            bairro: true,
            corCabeloNatural: true,
            tipoRaiz: true,
            curvaturaNatural: true
        },
    })

    function renderItem({ item, index }: ListRenderItemInfo<Props>): React.JSX.Element {
        return (
            <S.Item onPress={() => setValue(item.name, !getValues(item.name))}>
                <InputSwitch control={control} {...item} />
            </S.Item>
        )
    }

    return (
        <>
            <Header tipo='voltar' titulo='Campos visíveis' />
            <S.Container>
                <S.Titulo>Selecione quais campos serão utilizados no cadastro de clientes</S.Titulo>
                <S.ContainerItens>
                    <FlatList
                        data={campos}
                        renderItem={renderItem}                        
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </S.ContainerItens>

            </S.Container>
        </>

    )
}