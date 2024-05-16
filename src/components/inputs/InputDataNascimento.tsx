import { View } from 'react-native';
import { InputProps } from './types';
import { Controller } from 'react-hook-form';
import { mask } from 'react-native-mask-text';
import React from 'react';
import { InputPadrao } from './InputPadrao';

export default function InputDataNascimento(props: InputProps): React.JSX.Element {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }) => (
                <View style={{ flex: 1 }}>
                    <InputPadrao field={field} onChange={(e) => field.onChange(mask(e,"99/99/9999"))} label={props.label} icon={props.icon} onChangeIcon={props.onChangeIcon} password={props.password} keyboardType='numeric' />
                </View>
            )}
        />
    )
}
