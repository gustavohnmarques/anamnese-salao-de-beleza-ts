
import React from 'react';
import styled, { css } from "styled-components/native";
import { TamanhoFonte } from '../../utils/TamanhoFonte';
import { Props } from './types';

export default function DefaultButton(props: Props): React.JSX.Element {
    return (
        <Container onPress={props.onPress}>
            <Text>{props.text}</Text>
        </Container>
    )
}

const Container = styled.TouchableOpacity`    
    ${({ theme }) => css`        
        background-color: ${theme.colors.primary100};
        border-radius: 10px;
        width: 100%;
        height: 100%;        
        align-items: center;
        justify-content: center;
    `}
`

const Text = styled.Text`    
    ${({ theme }) => css`        
        font-size: ${TamanhoFonte(2)};
        color: ${theme.colors.textoPrimario};
        font-family: 'Roboto-Bold';
        letter-spacing: 1.2px;        
        font-weight: bold;
        opacity: 0.8;
    `}
`