import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from '@react-navigation/stack';

import Menu from "./components/Menu/Menu";

//Paginas
import Home from "./pages/Home/Home";
import Configuracoes from "./pages/Configuracoes/Configuracoes";

//Clientes
import Clientes from "./pages/Clientes/Clientes";
import CamposVisiveis from "./pages/Clientes/CamposVisiveis/CamposVisiveis";

//Filhos de configurações
import CorCabeloNatural from "./pages/Configuracoes/CorCabeloNatural/CorCabeloNatural";
import TipoRaiz from "./pages/Configuracoes/TipoRaiz/TipoRaiz";
import CurvaturaCabeloNatural from "./pages/Configuracoes/CurvaturaCabeloNatural/CurvaturaCabeloNatural";
import Alergia from "./pages/Configuracoes/Alergia/Alergia";

import { useTheme } from "./contexts/theme";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const StackConfiguracoes = () => (
    <Stack.Navigator initialRouteName="Config">
        <Stack.Screen name="Config" options={{ headerShown: false }} component={Configuracoes} />
        <Stack.Screen name="CorCabeloNatural" options={{ headerShown: false }} component={CorCabeloNatural}></Stack.Screen>
        <Stack.Screen name="TipoRaiz" options={{ headerShown: false }} component={TipoRaiz}></Stack.Screen>
        <Stack.Screen name="CurvaturaCabeloNatural" options={{ headerShown: false }} component={CurvaturaCabeloNatural}></Stack.Screen>
        <Stack.Screen name="Alergia" options={{ headerShown: false }} component={Alergia}></Stack.Screen>
    </Stack.Navigator>
)

const StackClientes = () => (
    <Stack.Navigator initialRouteName="Clientes">
        <Stack.Screen name="Clientes" options={{ headerShown: false }} component={Clientes} />
        <Stack.Screen name="CamposVisiveis" options={{ headerShown: false }} component={CamposVisiveis}></Stack.Screen>
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

            <Drawer.Screen
                name="Clientes"
                component={StackClientes}
                options={{ headerShown: false }}
            />
        </Drawer.Navigator>
    );
};

export default AppStack;
