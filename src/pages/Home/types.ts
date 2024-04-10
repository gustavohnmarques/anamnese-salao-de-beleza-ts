import { Control, FieldValues } from "react-hook-form"

export type CreateUser = {
    nome: string,
    dataNascimento: string,
    email: string,
    telefone: string,
    cidade?: number,
    endereco?: string,
    bairro?: string
}

export type Input = {
    control: Control<FieldValues>,
    name: string
}
