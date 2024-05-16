import React from 'react';
import * as S from "./styles";
import { Switch } from 'react-native-switch';
import { useTheme } from '../../contexts/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SwitchTema(): React.JSX.Element {
    const { handleChangeTheme, currentTheme, getTheme } = useTheme();
    return (
        <Switch
            value={currentTheme == 'dark' ? true : false}
            onValueChange={handleChangeTheme}
            backgroundActive={getTheme().colors.fundoSwitchTema}
            backgroundInactive={getTheme().colors.fundoSwitchTema}
            activeText={''}
            inActiveText={''}

            renderInsideCircle={() => currentTheme == 'dark' ? <S.IconeTheme name='moon-o' /> : <S.IconeTheme name='sun-o' />}

        />
    )
}

