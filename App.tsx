import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import "react-native-gesture-handler";

import AppStack from "./src/AppStack";
import { Theme } from './src/templates/theme';
import AppProvider from './src/contexts';

export default function App() {
  return (
    <AppProvider>
      <Theme>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </Theme>
    </AppProvider>
  );
};