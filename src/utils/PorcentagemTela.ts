import { Dimensions } from "react-native";

export const PorcentagemLarguraTela = (porcentagem: Number) => {
    return (Dimensions.get('window').width - (Dimensions.get('window').width / 100 * (100 - Number(porcentagem)))).toFixed(0)
}

export const PorcentagemAlturaTela = (porcentagem: Number) => {
    return (Dimensions.get('window').height - (Dimensions.get('window').height / 100 * (100 - Number(porcentagem)))).toFixed(0)
}