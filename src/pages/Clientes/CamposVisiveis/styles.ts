import styled, { css } from "styled-components/native";
import { TamanhoFonte } from "../../../utils/TamanhoFonte";
import { PorcentagemAlturaTela } from "../../../utils/PorcentagemTela";
import { CorComOpacidade } from "../../../utils/CorComOpacidade";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


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
        padding: 20px 0 20px 0;
        font-weight: bold;
        opacity: 0.6;
    `}
`

export const ContainerItens = styled.View`
    ${({ theme }) => css`
        background-color: ${theme.colors.fundoTelaSecundaria};
        border-radius: 5px;
        flex-direction: column;
        
    `}
`

export const Item = styled(TouchableWithoutFeedback)`
    ${({ theme }) => css`
        height: ${PorcentagemAlturaTela(6)}px;
        border-bottom-color: ${CorComOpacidade(theme.colors.textoPrimario, 0.2)};
        border-bottom-width: 1px;
        padding: 0px 20px;
    `}    
`

