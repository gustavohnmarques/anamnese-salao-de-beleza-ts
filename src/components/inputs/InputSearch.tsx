
import { TextInput, DefaultTheme } from 'react-native-paper';
import { inputPadraoProps } from './types';
import { useTheme } from '../../contexts/theme';
import React from 'react';
import { PropsInputSearchModal } from '../../types/InputSearchModal.type';

export function InputSearch(props: PropsInputSearchModal): React.JSX.Element {
    const {getTheme} = useTheme();
    return (
        <TextInput                 
            mode={'flat'}
            label={props.label}
            value={props.value}
            onChangeText={props.onChange}
            activeUnderlineColor={getTheme().colors.background200}
            textColor={getTheme().colors.background200}
            onFocus={props.onFocus}
            theme={{
                ...DefaultTheme,
                colors: {
                    ...DefaultTheme.colors,
                    error: getTheme().colors.danger100,
                }                
            }}

        />
    )
}










