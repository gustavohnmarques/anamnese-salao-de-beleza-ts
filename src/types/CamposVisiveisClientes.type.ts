import { SelectItens } from "./InputSelect.type";

export type CamposClientes = {
    nome: boolean,
    dataNascimento: boolean,
    email: boolean,
    celular: boolean,
    cidade: boolean,
    endereco: boolean,
    bairro: boolean,
    corCabeloNatural: boolean,
    tipoRaiz: boolean,
    curvaturaNatural: boolean,
};

export type CamposVisiveisClientes = {
    name: string,
    label: string,
    tipo: string,
    itens?: SelectItens[],
    visivel: boolean
}