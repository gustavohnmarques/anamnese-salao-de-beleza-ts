import { Control, ControllerRenderProps, FieldValues } from "react-hook-form";
import { GestureResponderEvent } from "react-native";
import { Mask } from "react-native-mask-input";

export type inputPadraoProps = {
    label: string,
    field: ControllerRenderProps,
    icon?: string;
    password?: boolean;
    onChangeIcon?: (e: GestureResponderEvent) => void
};


export type InputProps = {
    control: Control<any>,
    name: string,
    label: string,
    onChange?: (text: string) => void;
    icon?: string;
    password?: boolean;
    onChangeIcon?: (e: GestureResponderEvent) => void,    
};