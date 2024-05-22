import React, {useEffect, useState } from 'react';
import * as S from './styles';
import { FlatList, ListRenderItemInfo} from 'react-native';
import { object, boolean } from 'yup';
import { ConfigUser, Props } from './types';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputSwitch from '../../../components/Inputs/InputSwitch';
import Header from '../../../components/Header/Header';
import { getCamposVisiveisClientes, updateCampoVisivelClientes } from './useCamposInvisiveis';
import { CamposVisiveisClientes } from '../../../types/CamposVisiveisClientes.type';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default function CamposVisiveis(): React.JSX.Element {

    const route = useNavigation();
    const navigation = useNavigation();

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

    const [camposVisiveis, setCamposVisiveis] = useState<CamposVisiveisClientes>();

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

    const { control, getValues, setValue, formState: { errors } } = useForm<ConfigUser>({
        resolver: yupResolver(formType),
        defaultValues: {
            nome: true,
            dataNascimento: false,
            email: false,
            celular: false,
            cidade: false,
            endereco: false,
            bairro: false,
            corCabeloNatural: false,
            tipoRaiz: false,
            curvaturaNatural: false
        },
    })

    function renderItem({ item }: ListRenderItemInfo<Props>): React.JSX.Element {
        return (
            <S.Item onPress={() => !item.disabled && handleChange(item)}>
                <InputSwitch control={control} {...item} onChangeIcon={() => !item.disabled && handleChange(item)} />
            </S.Item>
        )
    }

    const handleChange = (item: Props) => {
        try {
            const novoValor = !getValues(item.name);
            setValue(item.name, novoValor)
            updateCampoVisivelClientes({campo: item.name, valor: novoValor})

            Toast.show({
                type: 'success',
                text1: 'Campo atualizado com sucesso!',                
            });
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getCamposVisiveisClientes(setCamposVisiveis)
    }, [])

    useEffect(() => {
        //Identificar quais campos estão disponiveis no banco e montar na tela
        if (camposVisiveis != undefined) {
            for (let index = 0; index < Object.keys(campos).length; index++) {
                setValue(campos[index].name, Boolean(camposVisiveis[campos[index].name]))
            }
        }
    }, [camposVisiveis])

    const confirmarCampos = () => {
        // const teste = route.getState()?.routes[1].params;
        // teste.atualizarCampos();
        navigation.goBack();
    }


    return (
        <>
            <Header tipo='voltar' titulo='Campos visíveis' handleClickVoltar={() => confirmarCampos()} />
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