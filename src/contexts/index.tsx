import React from 'react';
import { ThemeProvider } from './theme';

interface Props {
    children: React.ReactNode;
  }
  
const AppProvider: React.FC<Props> = ({children}) => {
    return <ThemeProvider>
        {children}
    </ThemeProvider>
}

export default AppProvider