import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";

import AppStack from "./src/AppStack";

export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};