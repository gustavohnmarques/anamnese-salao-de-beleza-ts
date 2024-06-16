import React, { useState } from "react";
import styled, { css } from "styled-components/native";
import { Checkbox } from 'react-native-paper';
import { TamanhoFonte } from "../../../utils/TamanhoFonte";
import { PropsItem } from "../types";
import { useTheme } from "../../../contexts/theme";


export default function Item(props: PropsItem) {

    const { getTheme } = useTheme();

    const [checked, setChecked] = useState<boolean>(props.checked)

    const handleClick = () => {
        setChecked(!checked);
        props.handleClick();
    }

    return (
        <ContainerItem onPress={handleClick} >
            <Checkbox status={checked ? 'checked' : 'unchecked'} color={getTheme().colors.textoModal} uncheckedColor={getTheme().colors.textoModal} />
            <ItemLabel>{props.label}</ItemLabel>
        </ContainerItem>
    )
}

const ItemLabel = styled.Text`
    ${({ theme }) => css`        
        color: ${theme.colors.textoMenu};
        font-size: ${TamanhoFonte(1.7)};
    `}
`

const ContainerItem = styled.TouchableOpacity`
    ${({ theme }) => css`        
        flex-direction: row;
        gap: 15px;
        align-items: center;        
    `}
`