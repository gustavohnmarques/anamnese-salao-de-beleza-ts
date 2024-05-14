import styled, { css } from "styled-components/native";
import { TamanhoFonte } from "../../../utils/TamanhoFonte";

export const Item = styled.View`    
    ${({ theme }) => css`
        height: 60px;
        width: 100%;
        border-radius: 5px;
        background-color: ${theme.colors.fundoCard};
        flex-direction: row;
    `}
`

export const Descricao = styled.View`    
    ${({ theme }) => css`
        height: 100%;
        width: 80%;
        justify-content: center;
        padding-left: 15px
    `}
`

export const Acoes = styled.View`    
    ${({ theme }) => css`
        height: 100%;
        width: 20%;
        flex-direction: row;
    `}
`

export const ItemAcao = styled.TouchableOpacity`    
    ${({ theme }) => css`
        justify-content: center;
        align-items: center;
        flex: 1;
    `}
`

export const TextoDescricao = styled.Text`    
    ${({ theme }) => css`
        font-size: ${TamanhoFonte(1.7)};
        color: ${theme.colors.textoPrimario};
        font-family: 'Roboto-Bold';
        letter-spacing: 1.2px;
        padding-left: 5px;                    
        opacity: 0.9;
    `}
`
