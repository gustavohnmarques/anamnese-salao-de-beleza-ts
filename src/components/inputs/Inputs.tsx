import { Alert, GestureResponderEvent, View } from 'react-native';
import { styles } from './styles';
import { TextInput } from 'react-native-paper';
import { InputProps, inputPadraoProps } from './types';
import { Controller, ControllerRenderProps } from 'react-hook-form';
import { mask } from 'react-native-mask-text';

function InputPadrao(props: inputPadraoProps): React.JSX.Element {
    return (
        <TextInput
            keyboardType={props.keyboardType}            
            mode={'flat'}
            label={props.label}
            value={props.field.value}
            onChangeText={props.onChange}
            secureTextEntry={props.password ?? false}
            right={props.icon != undefined && <TextInput.Icon icon={props.icon} onPress={props.onChangeIcon} />}
        />
    )
}


export function InputTexto(props: InputProps): React.JSX.Element {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }) => (
                <View style={{ flex: 1 }}>
                    <InputPadrao field={field} onChange={field.onChange} label={props.label} icon={props.icon} onChangeIcon={props.onChangeIcon} password={props.password} keyboardType='default' />
                </View>
            )}
        />
    )
}

export function InputDataNascimento(props: InputProps): React.JSX.Element {
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

export function InputCelular(props: InputProps): React.JSX.Element {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }) => (
                <View style={{ flex: 1 }}>
                    <InputPadrao field={field} onChange={(e) => field.onChange(mask(e,"(99) 9 9999-9999"))} label={props.label} icon={props.icon} onChangeIcon={props.onChangeIcon} password={props.password} keyboardType={'numeric'} />
                </View>
            )}
        />
    )
}




