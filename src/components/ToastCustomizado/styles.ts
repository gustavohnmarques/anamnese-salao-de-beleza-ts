import styled, { css } from "styled-components/native";
import { TamanhoFonte } from "../../utils/TamanhoFonte";

export const Container = styled.View`    
    ${({ theme }) => css`                
        flex-direction: row;
        flex: 1;
        border-radius: 8px;
        padding: 20px 40px;
    `}
`

export const Mensagem = styled.Text`
    ${({ theme }) => css`        
        font-size: ${TamanhoFonte(1.6)};
        color: #fff;
        font-family: 'Roboto-Bold';
        letter-spacing: 1.2px;    
        font-weight: bold;
        opacity: 0.9;
    `}
`

