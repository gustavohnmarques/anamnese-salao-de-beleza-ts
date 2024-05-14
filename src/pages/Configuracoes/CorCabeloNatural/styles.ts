import styled, { css } from "styled-components/native";

export const Container = styled.View`    
    ${({theme}) => css`
        flex: 1;
        background-color: ${theme.colors.fundoTelaPrimaria};
        padding: 30px 15px 0px 15px;
        padding-bottom: 30px;                
    `}
`