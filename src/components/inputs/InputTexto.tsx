import { View } from 'react-native';
import { InputProps } from './types';
import { Controller } from 'react-hook-form';
import React from 'react';
import { InputPadrao } from './InputPadrao';

export default  function InputTexto(props: InputProps): React.JSX.Element {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }) => (
                <View style={{ flex: 1}}>
                    <InputPadrao field={field} onChange={field.onChange} label={props.label} icon={props.icon} onChangeIcon={props.onChangeIcon} password={props.password} keyboardType='default' error={props.error ?? false} refInput={props.refInput} />
                </View>
            )}
        />
    )
}