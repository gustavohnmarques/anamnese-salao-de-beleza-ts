import styled, { css } from "styled-components/native";

export const Item = styled.View`    
    ${({ theme }) => css`
        height: 60px;
        width: 100%;
        border-radius: 5px;
        background-color: ${theme.colors.background200};
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
        color: ${theme.colors.textColor};
        font-size: 18px;
        font-weight: bold;
    `}
`
