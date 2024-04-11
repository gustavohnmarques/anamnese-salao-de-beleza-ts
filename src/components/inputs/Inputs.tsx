import { Alert, GestureResponderEvent, View } from 'react-native';
import { styles } from './styles';
import { TextInput } from 'react-native-paper';
import { InputProps, inputPadraoProps } from './types';
import { Controller } from 'react-hook-form';
import MaskInput, { Mask, Masks } from 'react-native-mask-input';

function InputPadrao(props: inputPadraoProps): React.JSX.Element {
    return (
        <TextInput
            mode={'flat'}
            label={props.label}
            value={props.field.value}
            onChangeText={props.field.onChange}
            secureTextEntry={props.password ?? false}
            right={props.icon != undefined && <TextInput.Icon icon={props.icon} onPress={props.onChangeIcon} />}
        />
    )
}


export function InputTexto(data: InputProps): React.JSX.Element {
    return (
        <Controller
            name={data.name}
            control={data.control}
            render={({ field }) => (
                <View style={{ flex: 1 }}>
                    <InputPadrao field={field} label={data.label} icon={data.icon} onChangeIcon={data.onChangeIcon} password={data.password} />
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
                    <TextInput
                        render={propsRnder =>
                            <MaskInput
                                style={{paddingTop: 15, width: '100%', fontSize: 16}}
                                placeholder={props.label}
                                value={field.value}
                                onChangeText={field.onChange}
                                mask={Masks.DATE_DDMMYYYY}
                            />
                        }
                    />

                </View>
            )}
        />
    )
}



