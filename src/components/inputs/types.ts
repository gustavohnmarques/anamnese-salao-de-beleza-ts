import { Control, FieldValues } from "react-hook-form";
import { GestureResponderEvent } from "react-native";

export type InputProps = {
    control: Control<FieldValues>,
    name: string,
    label: string,
    value: string;
    onChange: (text: string) => void;
    icon?: string;
    password?: boolean;
    onChangeIcon?: (e: GestureResponderEvent) => void
};