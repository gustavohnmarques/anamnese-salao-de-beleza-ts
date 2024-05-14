import styled, { css } from "styled-components/native";

export const Container = styled.View`    
    ${({theme}) => css`
        flex: 1;
        background-color: ${theme.colors.fundoTelaPrimaria};
    `}
`

export const Title = styled.Text`    
    ${({theme}) => css`        
        color: ${theme.colors.fundoTelaPrimaria};
    `}
`
