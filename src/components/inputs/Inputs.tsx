import { Alert, GestureResponderEvent, View } from 'react-native';
import { styles } from './styles';
import { TextInput } from 'react-native-paper';
import { InputProps } from './types';
import { Controller } from 'react-hook-form';


export function InputTexto(data: InputProps): React.JSX.Element {
    return (
        <Controller
            name={data.name}
            control={data.control}
            render={({ field }) => (
                <View style={{ flex: 1 }}>
                    <TextInput
                        label={data.label}
                        value={data.value}
                        onChangeText={data.onChange}
                        secureTextEntry={data.password ?? false}
                        right={data.icon != undefined && <TextInput.Icon icon={data.icon} onPress={data.onChangeIcon} />}
                    />
                </View>
            )}
        />
    )
}


