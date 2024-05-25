import styled, { css } from "styled-components/native";
import { TamanhoFonte } from "../../utils/TamanhoFonte";
import Icon from 'react-native-vector-icons/FontAwesome';

export const Container = styled.View`    
    ${({ theme }) => css`
        flex: 1;
        background-color: ${theme.colors.fundoTelaPrimaria};
        padding: 5px 20px 20px 20px;
    `}
`

export const Titulo = styled.Text`    
    ${({ theme }) => css`        
        font-size: ${TamanhoFonte(1.6)};
        color: ${theme.colors.textoPrimario};
        font-family: 'Roboto-Bold';
        letter-spacing: 1.2px;
        padding: 15px 0 15px 0;
        font-weight: bold;
        opacity: 0.6;
    `}
`

export const Icone = styled(Icon)`    
    ${({ theme }) => css`
        color: ${theme.colors.textoMenu};
        font-size: ${TamanhoFonte(2.5)};
    `}
`

export const ContainerLoader = styled.View`
    ${({ theme }) => css`
        margin-top: 50px;
    `}
`

