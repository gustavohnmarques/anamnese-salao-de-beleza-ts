import { Control, FieldValues } from "react-hook-form"
import { SelectItens } from "../../types/InputSelect.type"

export type CreateUser = {
    nome: string,
    dataNascimento: string,
    email: string,
    celular: string,
    cidade?: number,
    endereco?: string,
    bairro?: string
    corCabeloNatural?: string,
    tipoRaiz?: string,
    curvaturaNatural?: string,
}

export type Input = {
    control: Control<FieldValues>,
    name: string
}


export type PropsTipoInput = {
    tipo: string,
    name: string,
    label: string,
    itens: SelectItens[]
}