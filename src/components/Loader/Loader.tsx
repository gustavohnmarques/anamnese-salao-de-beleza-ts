import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import styled, { css } from "styled-components/native";
import { useTheme } from "../../contexts/theme";

type Props = {
    animating?: boolean,
    color?: string,
    size?: 'small' | 'large'
}

export default function Loader({animating = true, color = getTheme().colors.textoMenu, size = 'large'}: Props) {

    
    
    return (
        <ContainerLoader>
            <ActivityIndicator animating={animating} color={color} size={size} />
        </ContainerLoader>
    )
}

const ContainerLoader = styled(BottomSheetView)`
    ${({ theme }) => css`
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;        
    `}
`
function getTheme() {
    const { getTheme } = useTheme();
    return getTheme();
}

