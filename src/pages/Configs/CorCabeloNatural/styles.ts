import { StyleSheet, ViewStyle } from "react-native";

export const styles = StyleSheet.create({
    container: {
     
    } as ViewStyle,

    novoItem: {        
        height: 150,
        backgroundColor: 'red'
    } as ViewStyle,
    
});

import styled, { css } from "styled-components/native";

export const Container = styled.View`    
    ${({theme}) => css`
        flex: 1;
        background-color: "#eeedf3";
        padding: 0px 15px 0 15px;
        padding-bottom: 30px;        
    `}
`

export const Title = styled.Text`    
    ${({theme}) => css`        
        color: ${theme.colors.textColor};
    `}
`
