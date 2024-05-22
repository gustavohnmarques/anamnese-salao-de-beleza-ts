import React from 'react';
import { Controller } from 'react-hook-form';
import { Switch } from 'react-native-paper';
import { InputProps } from './types';
import styled, { css } from "styled-components/native";
import { TamanhoFonte } from '../../utils/TamanhoFonte';
import { useTheme } from '../../contexts/theme';
import { PorcentagemAlturaTela } from '../../utils/PorcentagemTela';

export default function InputSwitch(props: InputProps): React.JSX.Element {

    const {getTheme} = useTheme();

    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }) => (
                <Container>
                    <Titulo>{props.label}</Titulo>
                    <Switch value={field.value} onValueChange={field.onChange} color={getTheme().colors.primary100} disabled={props.disabled} />
                </Container>
            )}
        />
    )
}

const Container = styled.View`    
    ${({ theme }) => css`
        flex: 1;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: ${PorcentagemAlturaTela(6)}px;
        background-color: red;
    `}
`

const Titulo = styled.Text`    
    ${({ theme }) => css`
        font-size: ${TamanhoFonte(1.7)};
        color: ${theme.colors.textoPrimario};
        font-family: 'Roboto-Bold';
        letter-spacing: 1.2px;
        padding: 15px 0 15px 0;
        font-weight: bold;
        opacity: 0.6;
    `}
`












