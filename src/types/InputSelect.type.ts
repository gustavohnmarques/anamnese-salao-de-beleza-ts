import { Control } from "react-hook-form";
import { TextInput } from "react-native";

export type SelectItens = {
    label: string,
    value: string,
    key: number
}

export type SelectProps = {
    control: Control<any>,
    name: string,
    label: string,
    onChange?: (text: string) => void;
    error?: boolean,
    refInput?: React.RefObject<TextInput>,
    itens: SelectItens[],
};