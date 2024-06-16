import React, { useState } from "react";
import styled, { css } from "styled-components/native";
import { Checkbox } from 'react-native-paper';
import { TamanhoFonte } from "../../../utils/TamanhoFonte";
import { PropsInput } from "../types";
import { useTheme } from "../../../contexts/theme";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number } from 'yup';
import InputTexto from "../../Inputs/InputTexto";


export default function Input(props: PropsInput) {


    const formType = object({
        pesquisar: string(),
    })

    const { control, handleSubmit, reset, getValues, formState: { errors } } = useForm<any>({
        resolver: yupResolver(formType),
        defaultValues: {
            pesquisar: '',
        },
    })

    return (
        <ContainerInput>
            <InputTexto control={control} name='pesquisar' label='Pesquisar' onFocus={props.onFocus} />
        </ContainerInput>
    )
}

const ContainerInput = styled.View`
    ${({ theme }) => css`        
        height: 80px;        
    `}
`