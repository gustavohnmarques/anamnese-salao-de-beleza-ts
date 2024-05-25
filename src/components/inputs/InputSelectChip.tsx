import React from 'react';
import { Controller } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import styled, { css } from "styled-components/native";
import { SelectProps } from '../../types/InputSelect.type';
import { PorcentagemAlturaTela, PorcentagemLarguraTela } from '../../utils/PorcentagemTela';
import { TamanhoFonte } from '../../utils/TamanhoFonte';
import Icon from 'react-native-vector-icons/FontAwesome';


{/* <RNPickerSelect
style={{
    viewContainer: {
        opacity: 0,
        height: 30
    },
    chevronUp: {
        opacity: 0
    },
    chevron: {
        opacity: 0
    },
    placeholder: {
        color: '#4f4953',
    },
}}                        
value={field.value}
placeholder={{label: props.label}}
onValueChange={field.onChange}
items={props.itens}
/> */}

export default function InputSelectChip(props: SelectProps): React.JSX.Element {
    return (
        <Input>
            <Icone name='plus' />
            <Texto>Selecionar</Texto>
        </Input>
    )
}


const Input = styled.View`    
    ${({ theme }) => css`
        width: 150;
        background-color: #e7e1eb;
        border-radius: 10px;
        padding: 8px;
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

