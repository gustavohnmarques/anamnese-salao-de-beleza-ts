import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./pages/Home/Home";
import Menu from "./components/Menu/Menu";

import Configuracoes from "./pages/Configuracoes/Configuracoes";
import CorCabeloNatural from "./pages/Configuracoes/CorCabeloNatural/CorCabeloNatural";
import TipoRaiz from "./pages/Configuracoes/TipoRaiz/TipoRaiz";

import { useTheme } from "./contexts/theme";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StackConfiguracoes = () => (
    <Stack.Navigator initialRouteName="Config">
        <Stack.Screen name="Config" options={{ headerShown: false }} component={Configuracoes} />
        <Stack.Screen name="CorCabeloNatural" options={{ headerShown: false }} component={CorCabeloNatural}></Stack.Screen>
        <Stack.Screen name="TipoRaiz" options={{ headerShown: false }} component={TipoRaiz}></Stack.Screen>
    </Stack.Navigator>
)

const AppStack = () => {
    
    return (
        <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}>
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="Configuracoes"
                component={StackConfiguracoes}
                options={{ headerShown: false }}
            />
        </Drawer.Navigator>
    );
};

export default AppStack;
