import styled, { css } from "styled-components/native";
import { PorcentagemAlturaTela } from "../../utils/PorcentagemTela";
import { TamanhoFonte } from "../../utils/TamanhoFonte";

export const Container = styled.View`    
    ${({ theme }) => css`
        flex: 1;
        background-color: ${theme.colors.background100};
        padding: 0px 15px 0px 15px;        
    `}
`

export const TituloContainer = styled.Text`
    ${({ theme }) => css`
        font-size: ${TamanhoFonte(1.6)};
        color: ${theme.colors.textColor};
        font-family: 'Roboto-Bold';
        letter-spacing: 1.2px;
        padding: 15px 0 15px 0;
        font-weight: bold;
        opacity: 0.7;
    `}
`

export const ContainerItem = styled.View`
    ${({ theme }) => css`
        background-color: ${theme.colors.background300};
        border-radius: 5px;
        flex-direction: column;
        
    `}
`

export const Item = styled.TouchableOpacity`
    ${({ theme }) => css`        
        flex-direction: row;        
        height: ${PorcentagemAlturaTela(6)}px;
        justify-content: space-between;
        padding: 15px 20px 15px 5px;
        align-items: center;        
        border-bottom-width: 1px;
        border-bottom-color: ${theme.colors.background200};
        
    `}
`
export const TituloItem = styled.Text`
    ${({ theme }) => css`
        font-size: ${TamanhoFonte(1.6)};
        color: ${theme.colors.textColor};
        font-family: 'Roboto-Bold';
        letter-spacing: 1.2px;
        padding-left: 15px;        
        font-weight: bold;
    `}
`

export const ItemAcao = styled.View`
    ${({ theme }) => css`
        flex-direction: row;
        justify-content: space-between;
        gap: 25px;
    `}
`


export const SubTituloItem = styled.Text`
    ${({ theme }) => css`
        font-size: ${TamanhoFonte(1.4)};
        color: ${theme.colors.textColor};
        font-family: 'Roboto-Regular';
        letter-spacing: 1.2px;
        
    `}
`