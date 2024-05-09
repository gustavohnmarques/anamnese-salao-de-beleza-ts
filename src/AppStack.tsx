import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./pages/Home/Home";
import Menu from "./components/Menu/Menu";

import Configuracoes from "./pages/Configuracoes/Configuracoes";
import CorCabeloNatural from "./pages/Configuracoes/CorCabeloNatural/CorCabeloNatural";


import { useTheme } from "./contexts/theme";
const Drawer = createDrawerNavigator();

const AppStack = () => {

    const { getTheme } = useTheme();

    const headerStyle = {
        headerStyle: {
            backgroundColor: getTheme().colors.background100,
        },
        headerTintColor: getTheme().colors.textColor,

    }

    return (
        <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}>
            <Drawer.Screen
                name="Home"
                component={Home}
                options={headerStyle}
            />
            <Drawer.Screen
                name="Configuracoes"                
                options={headerStyle}
            >
                {(props) => (
                    <Configuracoes />
                )}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
};

export default AppStack;