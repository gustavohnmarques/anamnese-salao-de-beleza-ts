import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./pages/Home/Home";
import Menu from "./components/Menu/Menu";
import CorCabeloNatural from "./pages/Configs/CorCabeloNatural/CorCabeloNatural";
const Drawer = createDrawerNavigator();

const AppStack = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}>
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="CorCabelo"
                component={CorCabeloNatural}
            />
        </Drawer.Navigator>
    );
};

export default AppStack;