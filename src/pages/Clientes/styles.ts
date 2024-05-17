import styled, { css } from "styled-components/native";
import { TamanhoFonte } from "../../utils/TamanhoFonte";

export const Container = styled.View`    
    ${({theme}) => css`
        flex: 1;
        background-color: ${theme.colors.fundoTelaPrimaria};
        padding: 5px 20px 20px 20px;
    `}
`

export const Titulo = styled.Text`    
    ${({theme}) => css`        
        font-size: ${TamanhoFonte(1.6)};
        color: ${theme.colors.textoPrimario};
        font-family: 'Roboto-Bold';
        letter-spacing: 1.2px;
        padding: 15px 0 15px 0;
        font-weight: bold;
        opacity: 0.6;
    `}
`

