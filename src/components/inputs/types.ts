import { Control, ControllerRenderProps, FieldValues } from "react-hook-form";
import { GestureResponderEvent, KeyboardTypeOptions, TextInput } from "react-native";

export type inputPadraoProps = {
    label: string,
    field: ControllerRenderProps,
    icon?: string;
    password?: boolean;
    onChangeIcon?: (e: GestureResponderEvent) => void,
    onChange: (text: string) => void,
    keyboardType: KeyboardTypeOptions,
    error?: boolean,
    refInput?: React.RefObject<TextInput>,
    onFocus?: () => void,
};


export type InputProps = {
    control: Control<any>,
    name: string,
    label: string,
    onChange?: (text: string) => void;
    icon?: string;
    password?: boolean;
    onChangeIcon?: (e: GestureResponderEvent) => void,
    error?: boolean,
    refInput?: React.RefObject<TextInput>,
    disabled?: boolean,
    onFocus?: () => void,
};
