export type ConfigUser = {
    nome: boolean,
    dataNascimento: boolean,
    email: boolean,
    celular: boolean,
    cidade: boolean,
    endereco: boolean,
    bairro: boolean
    corCabeloNatural: boolean,
    tipoRaiz: boolean,
    curvaturaNatural: boolean,
}

export type AtualizarCampoVisivel = {
    campo: string,
    valor: boolean,
}

export type Props = {
    name: "nome" | "dataNascimento" | "email" | "celular" | "cidade" | "endereco" | "bairro" | "corCabeloNatural" | "tipoRaiz" | "curvaturaNatural",
    label: string,
    disabled: boolean
}