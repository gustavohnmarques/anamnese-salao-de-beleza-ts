
import { TextInput, DefaultTheme } from 'react-native-paper';
import { inputPadraoProps } from './types';
import { useTheme } from '../../contexts/theme';
import React from 'react';

export function InputPadrao(props: inputPadraoProps): React.JSX.Element {
    const {getTheme} = useTheme();
    return (
        <TextInput        
            error={props.error}
            keyboardType={props.keyboardType}            
            mode={'flat'}
            label={props.label}
            value={props.field.value}
            onChangeText={props.onChange}
            secureTextEntry={props.password ?? false}
            right={props.icon != undefined && <TextInput.Icon icon={props.icon} onPress={props.onChangeIcon} />}
            ref={props.refInput}
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










