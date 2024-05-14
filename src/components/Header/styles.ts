import styled, { css } from "styled-components/native";
import { PorcentagemAlturaTela, PorcentagemLarguraTela } from "../../utils/PorcentagemTela";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TamanhoFonte } from "../../utils/TamanhoFonte";

export const Container = styled.View`    
    ${({ theme }) => css`
        background-color: ${theme.colors.fundoHeader};
        height: ${PorcentagemAlturaTela(6)}px;
        border-bottom-width: 1px;
        border-bottom-color: ${theme.colors.background500};
        flex-direction: row;
    `}
`

export const Menu = styled.TouchableOpacity`    
    ${({ theme }) => css`
        width: ${PorcentagemAlturaTela(6)}px;
        height: 100%;                
        justify-content: center;
        align-items: center;
    `}
`

export const Icone = styled(Icon)`    
    ${({ theme }) => css`
        color: ${theme.colors.textoMenu};
        font-size: ${TamanhoFonte(2.5)};
    `}
`

export const ContainerTitulo = styled.View`
    ${({ theme }) => css`  
        flex: 1;        
        justify-content: center;
        padding-left: 10px;
        height: 100%; 
    `}
`

export const Titulo = styled.Text`
    ${({ theme }) => css`
        font-size: ${TamanhoFonte(1.9)};
        color: ${theme.colors.textoMenu};
        font-family: 'Roboto-Bold';
        letter-spacing: 1.2px;
        
    `}
`

export const ContainerDark = styled.View`
    ${({ theme }) => css`  
        display: flex;
        width: ${PorcentagemLarguraTela(20)}px;        
        justify-content: center;
        align-items: center;
    `}
`
export const IconeTheme = styled(Icon)`    
    ${({ theme }) => css`
        color: ${theme.colors.danger200};
        font-size: ${TamanhoFonte(1.8)};
    `}
`

