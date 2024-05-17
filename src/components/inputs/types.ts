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
};

export type Selectitems = {
    label: string,
    value: string
}

export type SelectProps = {
    control: Control<any>,
    name: string,
    label: string,
    onChange?: (text: string) => void;
    error?: boolean,
    refInput?: React.RefObject<TextInput>,
    items: Selectitems[],
};