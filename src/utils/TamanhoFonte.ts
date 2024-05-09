import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const TamanhoFonte = (tamanho: string | number) => {
    return (hp(tamanho)).toFixed(0) + 'px';
}