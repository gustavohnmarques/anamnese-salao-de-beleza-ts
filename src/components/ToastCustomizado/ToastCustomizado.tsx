import React from 'react';
import * as S from "./styles";
import Toast, { BaseToastProps } from 'react-native-toast-message';
import { useTheme } from '../../contexts/theme';

export default function ToastCustomizado(): React.JSX.Element { 
    
    const {getTheme} = useTheme();

    const toastConfig = {
        success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
            <S.Container style={{backgroundColor: getTheme().colors.success100}}>
                <S.Mensagem>{props.text1}</S.Mensagem>                
            </S.Container>
        ),
    };

    return (
        <Toast config={toastConfig} position='bottom' />
    )
}

