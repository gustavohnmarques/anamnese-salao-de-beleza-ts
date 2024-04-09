import { Alert, GestureResponderEvent, View } from 'react-native';
import { styles } from './styles';
import { TextInput } from 'react-native-paper';

export type InputProps = {
    label: string,
    value: string;
    onChange: (text: string) => void;
    icon?: string;
    password?: boolean;
    onChangeIcon?: (e: GestureResponderEvent) => void
};


export function Input(dados: InputProps): React.JSX.Element {
    return (
        <View style={{ width: '50%' }}>
            <TextInput
                label={dados.label}
                value={dados.value}
                onChangeText={dados.onChange}
                secureTextEntry={dados.password ?? false}
                right={dados.icon != undefined && <TextInput.Icon icon={dados.icon} onPress={dados.onChangeIcon} />}
            />
        </View>
    )

}


