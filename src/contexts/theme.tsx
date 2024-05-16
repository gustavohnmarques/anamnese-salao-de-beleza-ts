import React, {createContext, useContext, useState} from 'react';
import theme from '../styles';

export type Themes = "dark" | "light";

type ThemeContextData = {
    currentTheme: Themes,
    handleChangeTheme: () => void,
    getTheme: () => typeof theme.dark;
}

interface Props {
    children: React.ReactNode;
  }

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC<Props> = ({children}) => {

    const [selectedTheme, setSelectedTheme] = useState<Themes>('dark');    

    function handleChangeTheme(){
        if(selectedTheme === 'light'){
            setSelectedTheme('dark')
        }else{
            setSelectedTheme('light')
        }
    }

    function getTheme(){
        return theme[selectedTheme];
    }

    return <ThemeContext.Provider value={{
        currentTheme: selectedTheme,
        handleChangeTheme,
        getTheme,
    }}>
        {children}
    </ThemeContext.Provider>

}

export function useTheme(): ThemeContextData {
    const context = useContext(ThemeContext);
    if(!context){
        throw Error("Erro")
    }
    return context;

}