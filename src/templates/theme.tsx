import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../styles';
import { useTheme } from '../contexts/theme'
type Props = {
    children: React.ReactNode,
}

export function Theme({ children }: Props) {
    const {currentTheme} = useTheme();
    return <ThemeProvider theme={theme[currentTheme]}>{children}</ThemeProvider>
}