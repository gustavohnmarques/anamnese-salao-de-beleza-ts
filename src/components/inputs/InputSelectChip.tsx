import React, { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import styled, { css } from "styled-components/native";
import { SelectChipProps, SelectItens, SelectProps } from '../../types/InputSelect.type';
import { PorcentagemAlturaTela, PorcentagemLarguraTela } from '../../utils/PorcentagemTela';
import { TamanhoFonte } from '../../utils/TamanhoFonte';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function InputSelectChip(props: SelectChipProps): React.JSX.Element {

    const listaFormatada = () => {
        return props.itensRemover != undefined ? props.itens.filter((item) => !props.itensRemover?.includes(item.value as never)) : props.itens;
    }

    return (
        <RNPickerSelect
            placeholder={{
                label: 'Selecione um item',                
            }}            
            onValueChange={props.onChange}
            items={listaFormatada()}
            value={''}
            children={
                <Input>
                    <Icone name='plus' />
                    <Texto>{props.label}</Texto>
                </Input>
            }
        />
    )
}


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

