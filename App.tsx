import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";

import AppStack from "./src/AppStack";
import { Theme } from './src/templates/theme';

export default function App() {
  return (
    <Theme>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Theme>
  );
};