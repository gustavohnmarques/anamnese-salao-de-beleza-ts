import styled, { css } from "styled-components/native";

export const Container = styled.View`    
    ${({theme}) => css`    
        padding: 25px;
        align-items: center;        
    `}
`

export const Mensagem = styled.Text`    
    ${({theme}) => css`        
        font-size: 17px;
        color: ${theme.colors.textoPrimario};
        font-family: 'Roboto-Medium';
        letter-spacing: 1.2px;                
    `}
`
