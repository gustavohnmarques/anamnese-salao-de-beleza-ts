import { StyleSheet, TextStyle, ViewStyle } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#f8f4f3',
        paddingHorizontal: 20,
    } as ViewStyle,

    menu: {
        borderRadius: 5,
        alignItems: 'center',
    } as ViewStyle,

    menuItem: {
        flex: 1,
        height: 60,
        flexDirection: 'row',
        borderRadius: 5,
        alignItems: 'center',
    } as ViewStyle,

    titulo: {
        fontSize: 18,
        color: '#402e28',
        fontFamily: 'Roboto-Medium',
        letterSpacing: 1.2,
        paddingLeft: 15,
        flex: 1,
    } as TextStyle,

    menuItemFilho: {
        flex: 1,
        width: '100%',
        padding: 15
    } as ViewStyle,
});