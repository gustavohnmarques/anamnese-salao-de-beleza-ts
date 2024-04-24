import { Text, View } from "react-native";
import { styles } from "./styles";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Header(): React.JSX.Element {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Text>Menu</Text>
            </TouchableOpacity>
        </View>
    )
}