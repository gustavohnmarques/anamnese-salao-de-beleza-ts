import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/pages/Home/Home'

//Configs
import CorCabeloNatural from './src/pages/Configs/CorCabeloNatural/CorCabeloNatural';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="CorCabelo">
        <Drawer.Screen
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          name="CorCabelo"
          component={CorCabeloNatural}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}