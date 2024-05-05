import styled, { css } from "styled-components/native";

export const Container = styled.View`    
    ${({ theme }) => css`
        width: 100%;
    `}
`

export const NovoItem = styled.View`    
    ${({ theme }) => css`        
        flex-direction: row;
        justify-content: center;
        height: 65px;        
    `}
`

export const Input = styled.View`    
    ${({ theme }) => css`        
        flex-direction: 'row';
        flex: 1;
    `}
`
export const ContainerBtn = styled.View`    
    ${({ theme }) => css`        
        width: 120px;
        height: 100%;
        padding-left: 15px;
    `}
`


export const ContainerBtnCancelar = styled.TouchableOpacity`    
    ${({ theme }) => css`        
        width: 70px;
        height: 100%;
        padding-left: 15px;
    `}
`

export const BtnCancelar = styled.View`    
    ${({ theme }) => css`        
        height: 55;
        background-color: #ff5f56;
        justify-content: center;
        align-items: center;
        border-radius: 5;
    `}
`


export const BtnConfirmar = styled.View`    
    ${({ theme }) => css`        
        height: 55px;
        background-color: #579d83;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
    `}
`

