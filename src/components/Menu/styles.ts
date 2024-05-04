import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import styled, { css } from "styled-components/native";

// export const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         width: '100%',
//         backgroundColor: '#f8f4f3',
//         paddingHorizontal: 20,
//     } as ViewStyle,

//     menu: {
//         borderRadius: 5,
//         alignItems: 'center',
//     } as ViewStyle,

//     menuItem: {
//         flex: 1,
//         height: 60,
//         flexDirection: 'row',
//         borderRadius: 5,
//         alignItems: 'center',
//     } as ViewStyle,

//     titulo: {
// fontSize: 18,
// color: '#402e28',
// fontFamily: 'Roboto-Medium',
// letterSpacing: 1.2,
// paddingLeft: 15,
// flex: 1,
//     } as TextStyle,

//     menuItemFilho: {
//         flex: 1,
//         width: '100%',
//         padding: 15
//     } as ViewStyle,
// });


export const Container = styled.View`    
    ${({ theme }) => css`
        flex: 1;
        background-color: ${theme.colors.background300};
    `}
`

export const Menu = styled.TouchableOpacity`    
    ${({ theme }) => css`
        border-radius: 5px;
        align-items: 'center';
        margin: 0px 15px 0px 15px;        
        border-bottom-color: #636363;
    `}
`

export const MenuItem = styled.View`
    ${({ theme }) => css`        
        color: ${theme.colors.textColor};
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
        color: ${theme.colors.textColor};
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