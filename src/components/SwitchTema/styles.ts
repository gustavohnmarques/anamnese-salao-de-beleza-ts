import styled, { css } from "styled-components/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TamanhoFonte } from "../../utils/TamanhoFonte";

export const IconeTheme = styled(Icon)`    
    ${({ theme }) => css`
        color: ${theme.colors.iconeSwitchTema};
        font-size: ${TamanhoFonte(1.8)};
    `}
`

