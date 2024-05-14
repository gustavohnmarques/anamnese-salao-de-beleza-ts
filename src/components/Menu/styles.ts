import styled, { css } from "styled-components/native";
import { BlurView } from "@react-native-community/blur";

export const Container = styled.View`    
    ${({ theme }) => css`
        flex: 1;
        background-color: ${theme.colors.fundoMenu};
    `}
`

export const Menu = styled.TouchableOpacity`    
    ${({ theme }) => css`
        border-radius: 8px;
        align-items: 'center';
        margin: 0px 15px 0px 15px;                
        height: 60px;
        flex: 1;
        align-items: center;
        padding-left: 15px;
        flex-direction: row;
    `}
`

export const MenuItem = styled.View`
    ${({ theme }) => css`        
        color: ${theme.colors.textoPrimario};
        flex: 1;
        height: 60px;        
        flex-direction: row;
        border-radius: 5px;
        align-items: center;
        padding: 0px 20px 0px 20px;
    `}
`

export const Titulo = styled.Text`    
    ${({ theme }) => css`        
        font-size: 15px;
        color: ${theme.colors.textoMenu};
        font-family: 'Roboto-Medium';
        letter-spacing: 1.2px;
        padding-left: 15px;
        flex: 1;
    `}
`

export const MenuItemFilho = styled.View`
    ${({ theme }) => css`        
        flex: 1;
        width: 100%;
        
    `}
`